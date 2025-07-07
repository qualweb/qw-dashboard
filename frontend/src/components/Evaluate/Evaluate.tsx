import { useNavigate, useParams } from 'react-router-dom';
import DashboardMenu from '../DashboardMenu/DashboardMenu';
import './Evaluate.css'
import { CheckIcon, KeyRound, Trash2, X } from 'lucide-react';
import { Checkbox } from '@ark-ui/react/checkbox';
import { Chart } from '../../assets/Icons';
import { createListCollection } from '@ark-ui/react/collection';
import { useEffect, useRef, useState } from 'react';
import { getEventSource, useMonitoringApi } from '../../services/EvaluationService';
import { Webpage } from '../Types/Types';
import AddWebpages from '../AddWebpages/AddWebpages';
import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { Field } from '@ark-ui/react/field';
import { useAuth0 } from '@auth0/auth0-react';
import { Progress } from '@ark-ui/react/progress';

function Evaluate() {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
        
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
        navigate('/');
        }
    }, [isLoading, isAuthenticated]);

    const { runEvaluation, getMonitoredWebpages, deleteWebpage } = useMonitoringApi();

    const { monitoring_id } = useParams();

    const [webpagesToEval, setWebpagesToEval] = useState<[url: string, needs_authentication: boolean][]>([]);
    const [monitoredWebpages, setMonitoredWepages] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isEvaluated, setIsEvaluated] = useState(false);

    useEffect(() => {
        if (isEvaluated) {
            const timer = setTimeout(() => {
                setIsEvaluated(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isEvaluated]);

    const refreshWebpages = () => {
        setRefreshTrigger(!refreshTrigger);
    };

    useEffect(() => {
        const fetchMonitoredWebpages = async () => {
            if (!monitoring_id) return;
            
            try {
                const data = await getMonitoredWebpages(monitoring_id);
                setMonitoredWepages(data);
            } catch (error) {
                console.error('Error fetching monitored webpages:', error);
            }
        }

        fetchMonitoredWebpages();
    }, [monitoring_id, refreshTrigger]);

    const items = createMonitoredWebpagesCollection(monitoredWebpages);

    const collection = createListCollection({
        items: items,
    });

    const stopMonitoringWebpage = async (webpage: string) => {
        const removeWebpage = async () => {
            await deleteWebpage(webpage);
        }
    
        await removeWebpage();
        refreshWebpages();
    }

    const evaluateWebpages = async (username?: string, password?: string): Promise<void> => {
        if (!monitoring_id) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const webpage_ids = webpagesToEval.map((webpage : any) => webpage[0]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const needs_authentication = webpagesToEval.map((webpage : any) => webpage[1]);

        console.log(webpagesToEval);
        console.log("Evaluating webpages with IDs:", webpage_ids);
        console.log("Needs authentication:", needs_authentication);

        const data = await runEvaluation(
            String(monitoring_id), 
            webpage_ids, 
            needs_authentication,
            username,
            password
        );
    
        const newJob = {
            jobId: data.jobId,
            monitoringId: monitoring_id,
            totalWebpages: data.total_webpages,
            status: 'queued',
            total: data.total_webpages,
            completed: 0,
            error_count: 0,
            current_webpage: '',
            created: new Date().toISOString(),
            last_updated: new Date().toISOString()
        };

        setJobs(prev => new Map(prev.set(data.jobId, newJob)));

        console.log('Job ID:', data.jobId);
        console.log(jobs);
        
        startProgressTracking(data.jobId);

        setIsEvaluated(true);
    };

    const hasWebpagesNeedingAuth = (): boolean => {
        return webpagesToEval.some(([, needs_authentication]) => needs_authentication );
    };

    const hiddenInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const hiddenInputSelectAllRef = useRef<HTMLElement | null>();
    const [selectAll, setSelectAll] = useState(false);

    const [jobs, setJobs] = useState(new Map());
    const [, setActiveConnections] = useState(new Map());
    const connectionsRef = useRef(new Map());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [loadingWebsite, setLoadingWebsite] = useState<[any, number]>();
    const ACTIVE_JOBS_KEY = `active_jobs_user_${monitoring_id}`;

    const saveActiveJobIds = () => {
        try {
            const activeJobIds = Array.from(jobs.keys()).filter(jobId => {
                const job = jobs.get(jobId);
                return job && (job.status === 'running' || job.status === 'queued');
            });
            localStorage.setItem(ACTIVE_JOBS_KEY, JSON.stringify(activeJobIds));
        } catch (error) {
            console.error('Failed to save active job IDs:', error);
        }
    };

    const loadAndReconnectJobs = () => {
        try {
            console.log(localStorage)
            console.log(ACTIVE_JOBS_KEY)
            const start = performance.now();
            const stored = localStorage.getItem(ACTIVE_JOBS_KEY);
            if (stored) {
                const jobIds: string[] = JSON.parse(stored);
                console.log(`Found ${jobIds.length} active jobs, reconnecting...`);
                
                const initialJobs = new Map();
                jobIds.forEach(jobId => {
                    initialJobs.set(jobId, {
                        jobId,
                        status: 'queued',
                        created: new Date().toISOString(),
                        last_updated: new Date().toISOString()
                    });
                });
                console.log('Initial jobs:', initialJobs);

                setJobs(initialJobs); 
                
                jobIds.forEach(jobId => {
                    setTimeout(() => startProgressTracking(jobId), 1000);
                });

                console.log('Active jobs loaded:', jobIds);
                const end = performance.now();
                console.log(`localStorage read took ${end - start}ms`);   
            }
        } catch (error) {
            console.error('Failed to load job IDs:', error);
        }
    };

    useEffect(() => {
        loadAndReconnectJobs();
    }, []);

    useEffect(() => {
        if (jobs.size > 0) {
            saveActiveJobIds();
        }
    }, [jobs]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const startProgressTracking = (jobId: any) => {
        if (connectionsRef.current.has(jobId)) {
        return;
        }

        const eventSource = getEventSource(jobId);
        
        connectionsRef.current.set(jobId, eventSource);
        setActiveConnections(new Map(connectionsRef.current));

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                
                if (data.error) {
                    stopProgressTracking(jobId);
                    return;
                }

                setJobs(prev => {
                    const updated = new Map(prev);
                    const existingJob = updated.get(jobId) || {};
                    
                    updated.set(jobId, {
                        ...existingJob,
                        ...data,
                        jobId: jobId,
                        last_updated: new Date().toISOString()
                    });
                    
                    return updated;
                });
                
                const progress = `${data.completed}/${data.total}`;
                const percentage = Math.round((data.completed / data.total) * 100);
                console.error(`Job ${jobId}: ${progress} completed (${percentage}%)`);

                setLoadingWebsite([jobId, percentage]);

                // Check if job is completed
                if (percentage === 100 || data.status === 'completed') {
                    console.error(`🎉 Job ${jobId} completed successfully!`, 'success');
                    stopProgressTracking(jobId);
                } else if (data.status === 'failed') {
                    console.error(`❌ Job ${jobId} failed`, 'error');
                    stopProgressTracking(jobId);
                }
            } catch (error) {
                console.error(`Error processing job ${jobId}: ${error}`, error);
            }
        };

        // Handle connection errors
        eventSource.onerror = (error) => {
            console.error('SSE Error:', error);
        };
        
    
    };

    const stopProgressTracking = (jobId : string) => {
        const eventSource = connectionsRef.current.get(jobId);
        if (eventSource) {
          eventSource.close();
          connectionsRef.current.delete(jobId);
          setActiveConnections(new Map(connectionsRef.current));
        }
    };

    useEffect(() => {
        if (loadingWebsite && loadingWebsite[1] === 100) {
            setLoadingWebsite(undefined);
        }
    }, [loadingWebsite]);

    return (
        <div className='evaluate-wrapper'>
            <DashboardMenu monitoring_id={String(monitoring_id)} />
            {monitoring_id ? (
                <div className='evaluate-container'>
                    <div className='evaluate-title-container'>
                        {Chart}
                        <h2>Evaluate</h2>
                    </div>
                    <div className="select-add-list-wrapper">
                        <div className='add-webpages-container'>
                            <Checkbox.Root className='checkbox-all' value='select-all' key='select-all'
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === ' ') {
                                        e.preventDefault();
                                        
                                        hiddenInputSelectAllRef.current?.click();
                                    }
                                }}
                                role='checkbox'
                                aria-checked={selectAll}
                                checked={webpagesToEval.length === collection.items.length}
                                aria-label='Select all webpages'
                            >
                                <Checkbox.HiddenInput className='checkbox-webpage-hidden-input' 
                                    ref={(el) => {
                                        hiddenInputSelectAllRef.current = el;
                                    }}
                                    onClick={() => {
                                        console.log('Checkbox clicked for select all');
                                        const newSelectAll = !selectAll;
                                        setSelectAll(newSelectAll);
                                        
                                        if (newSelectAll) {
                                            // If checking select all, select all
                                            const newWebpagesToEval: [string, boolean][] = [];
                                            collection.items.forEach(item => {
                                                newWebpagesToEval.push([item.value, item.needs_authentication]);
                                            });
                                            setWebpagesToEval(newWebpagesToEval);
                                        } else {
                                            // If unchecking select all, deselect all
                                            setWebpagesToEval([]);
                                        }
                                    }}
                                    tabIndex={-1}
                                />
                                <Checkbox.Control className='checkbox-webpage-control'>
                                    <Checkbox.Indicator className='checkbox-webpage-indicator'>
                                        <CheckIcon />
                                    </Checkbox.Indicator>
                                </Checkbox.Control>
                                <Checkbox.Label className='checkbox-webpage-label'>Select all</Checkbox.Label>
                            </Checkbox.Root>
                            <AddWebpages 
                                monitoring_id={monitoring_id}
                                refreshTrigger={refreshWebpages}
                            />
                        </div>
                        <Checkbox.Group 
                            className='webpages-container' 
                            name="framework"
                            value={webpagesToEval.map(webpage => webpage[0])} 
                            onValueChange={(details) => {
                                const selectedValues = Array.from(details.values());
                                
                                const newWebpagesToEval: [string, boolean][] = [];
                                
                                selectedValues.forEach(value => {
                                    const item = collection.items.find(item => item.value === value);
                                    if (item) {
                                        newWebpagesToEval.push([item.value, item.needs_authentication]);
                                    }
                                });
                                
                                setWebpagesToEval(newWebpagesToEval);
                            }}
                        >
                            {collection.items.map((item) => (
                                <div className='webpage-container' key={item.value}>
                                    <div className='checkbox-webpage-container'>
                                        <Checkbox.Root className='checkbox-webpage' 
                                            value={item.value} 
                                            key={item.value} 
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === ' ') {
                                                    e.preventDefault();
                                                    
                                                    hiddenInputRefs.current[item.value]?.click();
                                                }
                                            }}
                                            aria-label={(() => {
                                                return item.needs_authentication ? `${item.label} requires authentication` : `${item.label}`;
                                            })()}
                                            role='checkbox'
                                            aria-checked={webpagesToEval.some(webpage => webpage[0] === item.value)} 
                                        >
                                            <Checkbox.HiddenInput className='checkbox-webpage-hidden-input' 
                                                ref={(el) => {
                                                    hiddenInputRefs.current[item.value] = el;
                                                }}
                                                onClick={() => {
                                                    console.log('Checkbox clicked:', item.value);
                                                    setSelectAll(false);
                                                }}
                                                tabIndex={-1}
                                            />
                                            <Checkbox.Control className='checkbox-webpage-control'>
                                                <Checkbox.Indicator className='checkbox-webpage-indicator'>
                                                    <CheckIcon />
                                                </Checkbox.Indicator>
                                            </Checkbox.Control>
                                            <Checkbox.Label className='checkbox-webpage-label'>{item.label}</Checkbox.Label>
                                        </Checkbox.Root>
                                        <div className="delete-auth">
                                            {item.needs_authentication ? <KeyRound /> : null}
                                            <button className='checkbox-webpage-trash-button' aria-label='Delete and stop monitoring webpage' onClick={() => {
                                                stopMonitoringWebpage(item.value);
                                            }}>
                                                <Trash2 aria-label='Trash icon' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Checkbox.Group>
                    </div>
                    <div className='evaluate-button-container'>
                        <div className="evaluate-button-wrapper">
                            { !loadingWebsite ? (
                                <button className='evaluate-button' onClick={() => {
                                    if (hasWebpagesNeedingAuth()) {
                                        setIsOpen(true);
                                        return;
                                    }

                                    evaluateWebpages();

                                    setWebpagesToEval([]);
                                    if (selectAll) {
                                        setSelectAll(false);
                                    }

                                    setLoadingWebsite([monitoring_id, 0]);
                                }}>Evaluate</button>
                            ) : (
                                <Progress.Root value={loadingWebsite[1]} className='progress-loading'>
                                    <div className="label">
                                        <span><strong>Evaluating website: </strong></span>
                                        <Progress.ValueText />
                                    </div>
                                    <Progress.Track className='track-loading'>
                                        <Progress.Range className='range-loading' />
                                    </Progress.Track>
                                </Progress.Root>
                            )}
                        </div>
                    </div>
                    <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
                        <Portal>
                            <Dialog.Backdrop className="dialog-backdrop" />
                            <Dialog.Positioner className="dialog-positioner" >
                                <Dialog.Content className="dialog-content" >
                                    <div className="login-bypass-title-close">
                                        <Dialog.Title className="dialog-title" >Login Bypass</Dialog.Title>
                                        <Dialog.CloseTrigger className="dialog-close-trigger" ><X /></Dialog.CloseTrigger>
                                    </div>
                                    <div className="user-pass-login-bypass">
                                        <p>Some of the selected webpages require authentication to be evaluated.</p>
                                        <Field.Root className='field-selector' >
                                            <Field.Label><strong>Introduce your username:</strong></Field.Label>
                                            <Field.Input className='user-pass-login-bypass-input' onChange={(e) => {
                                                setUsername(e.target.value);
                                            }} />
                                            <Field.ErrorText>Error Info</Field.ErrorText>
                                        </Field.Root>
                                        <Field.Root className='field-selector' >
                                            <Field.Label><strong>Introduce your password:</strong></Field.Label>
                                            <Field.Input className='user-pass-login-bypass-input' type="password" onChange={(e) => {
                                                setPassword(e.target.value);
                                            }} />
                                            <Field.ErrorText>Error Info</Field.ErrorText>
                                        </Field.Root>
                                        <button className='evaluate-button' onClick={() => {
                                            evaluateWebpages(username, password);
                                            setIsOpen(false);
                                            setUsername('');
                                            setPassword('');
                                        }}>Evaluate</button>
                                    </div>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                </div>
            ) : null}
        </div>
    );
}

export default Evaluate;


function createMonitoredWebpagesCollection(monitoredWebpages: Webpage[]) {
    const items: { label: string, value: string, needs_authentication: boolean }[] = [];
    
    monitoredWebpages.forEach((webpage : Webpage) => {
        items.push({ 
            label: webpage.url, 
            value: webpage.id.toString(),
            needs_authentication: webpage.needs_authentication
        });
    });
    
    return items;
}