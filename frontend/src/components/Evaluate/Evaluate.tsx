import { useParams } from 'react-router-dom';
import DashboardMenu from '../DashboardMenu/DashboardMenu';
import './Evaluate.css'
import { CheckCheck, CheckIcon, KeyRound, Trash2, X } from 'lucide-react';
import { Checkbox } from '@ark-ui/react/checkbox';
import { Chart } from '../../assets/Icons';
import { createListCollection } from '@ark-ui/react/collection';
import { useEffect, useRef, useState } from 'react';
import { useMonitoringApi } from '../../services/EvaluationService';
import { Webpage } from '../Types/Types';
import AddWebpages from '../AddWebpages/AddWebpages';
import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { Field } from '@ark-ui/react/field';
import LoadingWheel from '../LoadingWheel/LoadingWheel';

function Evaluate() {
    const { runEvaluation, getMonitoredWebpages, deleteWebpage } = useMonitoringApi();

    const { monitoring_id } = useParams();

    const [webpagesToEval, setWebpagesToEval] = useState<[url: string, needs_authentication: boolean][]>([]);
    const [monitoredWebpages, setMonitoredWepages] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isEvaluating, setIsEvaluating] = useState(false);
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
        setIsEvaluating(true);

        if (!monitoring_id) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const webpage_ids = webpagesToEval.map((webpage : any) => webpage[0]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const needs_authentication = webpagesToEval.map((webpage : any) => webpage[1]);

        console.log(webpagesToEval);
        console.log("Evaluating webpages with IDs:", webpage_ids);
        console.log("Needs authentication:", needs_authentication);

        await runEvaluation(
            String(monitoring_id), 
            webpage_ids, 
            needs_authentication,
            username,
            password
        );
    
        setIsEvaluating(false);
        setIsEvaluated(true);
    };

    const hasWebpagesNeedingAuth = (): boolean => {
        return webpagesToEval.some(([, needs_authentication]) => needs_authentication );
    };

    const hiddenInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    console.log(hiddenInputRefs)

    return (
        <div className='evaluate-wrapper'>
            <DashboardMenu monitoring_id={String(monitoring_id)} />
            {monitoring_id ? (
                <div className='evaluate-container'>
                    <div className='evaluate-title-container'>
                        {Chart}
                        <h2>Evaluate</h2>
                    </div>
                    <div className='add-webpages-container'>
                        <AddWebpages 
                            monitoring_id={monitoring_id}
                            refreshTrigger={refreshWebpages}
                        />
                    </div>
                    <Checkbox.Group 
                        className='webpages-container' 
                        name="framework" 
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
                                    <Checkbox.Root className='checkbox-webpage' value={item.value} key={item.value}
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
                    <div className='evaluate-button-container'>
                        <div className="evaluate-button-wrapper">
                            <button className='evaluate-button' onClick={() => {
                                if (hasWebpagesNeedingAuth()) {
                                    setIsOpen(true);
                                    return;
                                }

                                evaluateWebpages();
                            }}>
                                <LoadingWheel isLoading={isEvaluating} />
                                Evaluate
                            </button>
                            {isEvaluated ? (
                                <div className='schedule-check-container'>
                                    <CheckCheck />
                                </div>
                            ) : null}
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