import './AddMonitoringRegistryButton.css'
import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { createListCollection, Select } from '@ark-ui/react/select';
import { ChevronDownIcon, X, AlertCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getEventSource, getMonitoredWebpages, runCrawler, runEvaluation } from '../../services/EvaluationService';

interface AddMonitoringRegistryButtonProps {
    user_id: number;
    onChange: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onAdd: React.Dispatch<React.SetStateAction<Map<any, any>>>;
}

export function AddMonitoringRegistryButton(props: AddMonitoringRegistryButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [screenOrientation, setScreenOrientation] = useState('Horizontal');
    const [device, setDevice] = useState('Desktop');
    
    const [websiteName, setWebsiteName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    
    const [nameError, setNameError] = useState('');
    const [urlError, setUrlError] = useState('');
    const [dimensionsError, setDimensionsError] = useState('');

    const [jobs, setJobs] = useState(new Map());
    const [, setActiveConnections] = useState(new Map());
    const connectionsRef = useRef(new Map());

    // Simple storage - just job IDs
    const ACTIVE_JOBS_KEY = `active_jobs_user_${props.user_id}`;

    // Save only active job IDs
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

    // Load job IDs and reconnect
    const loadAndReconnectJobs = () => {
        try {
            console.log(localStorage)
            console.log(ACTIVE_JOBS_KEY)
            const start = performance.now();
            const stored = localStorage.getItem(ACTIVE_JOBS_KEY);
            if (stored) {
                const jobIds: string[] = JSON.parse(stored);
                console.log(`Found ${jobIds.length} active jobs, reconnecting...`);
                
                // 🔥 ADD THIS: Initialize jobs in state
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
        loadAndReconnectJobs(); // Remove the setTimeout
    }, []);

    useEffect(() => {
        if (jobs.size > 0) {
            saveActiveJobIds();
        }
    }, [jobs]);

    const validateName = () => {
        if (!websiteName.trim()) {
            setNameError('Website name is required');
            return false;
        }
        setNameError('');
        return true;
    };
    
    const validateUrl = () => {
        if (!websiteUrl.trim()) {
            setUrlError('Website URL is required');
            return false;
        }
        
        try {
            new URL(websiteUrl);
            setUrlError('');
            return true;
        } catch (e) {
            setUrlError('Please enter a valid URL (e.g., https://example.com)');
            console.error('Invalid URL:', e);
            return false;
        }
    };
    
    const validateDimensions = () => {
        if (!width || !height) {
            setDimensionsError('Both width and height are required');
            return false;
        }
        
        if (Number(width) <= 0 || Number(height) <= 0) {
            setDimensionsError('Dimensions must be positive numbers');
            return false;
        }
        
        setDimensionsError('');
        return true;
    };
    
    const handleSubmit = async () => {
        const isNameValid = validateName();
        const isUrlValid = validateUrl();
        const areDimensionsValid = validateDimensions();
        
        if (isNameValid && isUrlValid && areDimensionsValid) {
            setIsOpen(false);

            const monitoring_registry_id = await runCrawler(
                websiteName,
                websiteUrl, 
                device === 'Desktop',
                screenOrientation === 'Horizontal',
                Number(width),
                Number(height),
                props.user_id
            );

            const webpages = await getMonitoredWebpages(monitoring_registry_id);
            console.log(webpages);
            
            console.log('Monitoring registry ID:', monitoring_registry_id);

            if (monitoring_registry_id) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const webpage_ids = webpages.map((webpage : any) => webpage['id']);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const needs_authentication = webpages.map((webpage : any) => webpage['needs_authentication']);

                const data = await runEvaluation(
                    String(monitoring_registry_id), 
                    webpage_ids, 
                    needs_authentication
                );

                // Create new job entry
                const newJob = {
                    jobId: data.jobId,
                    monitoringId: monitoring_registry_id,
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

                props.onChange();
            }
        }
    };

    // Start SSE connection for a specific job
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

                props.onAdd((prev) => {
                    const newMap = new Map(prev);
                    newMap.set(jobId, percentage);
                    return newMap;
                });

                // Check if job is completed
                if (data.status === 'completed') {
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
        if (!isOpen) {
            setWebsiteName('');
            setWebsiteUrl('');
            setWidth('');
            setHeight('');
            
            setNameError('');
            setUrlError('');
            setDimensionsError('');
        }
    }, [isOpen]);

    const screen_orientations = createListCollection({ items: ['Horizontal', 'Vertical'] })
    const devices = createListCollection({ items: ['Desktop', 'Mobile'] })

    return (
        <>
            <button type="button" className='add-website-button' onClick={() => setIsOpen(true)}>
                <strong>+ New Website</strong>
            </button>
            <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
                <Portal>
                <Dialog.Backdrop className='dialog-backdrop' />
                <Dialog.Positioner className="dialog-positioner">
                    <Dialog.Content className='add-website-dialog-content'>
                        <div className='add-website-dialog-header'>
                            <Dialog.Title>Add New Website</Dialog.Title>
                            <Dialog.CloseTrigger className='add-website-dialog-close' aria-label='Close dialog' ><X /></Dialog.CloseTrigger>
                        </div>
                        <Dialog.Description className='add-website-dialog-desc'>
                            <div className='add-website-dialog-desc-content'>
                                <div className='enter-website-name'>
                                    <h3>Enter website name:</h3>
                                    <input 
                                        type="text" 
                                        placeholder="Enter website name" 
                                        value={websiteName}
                                        onChange={(e) => setWebsiteName(e.target.value)}
                                        onBlur={validateName}
                                        className={nameError ? 'input-error' : ''}
                                    />
                                    {nameError && (
                                        <div className="error-message">
                                            <AlertCircle size={16} />
                                            <span>{nameError}</span>
                                        </div>
                                    )}
                                </div>
                                <div className='enter-website-url'>
                                    <h3>Enter website URL:</h3>
                                    <input 
                                        type="text" 
                                        placeholder="Enter website URL" 
                                        value={websiteUrl}
                                        onChange={(e) => setWebsiteUrl(e.target.value)}
                                        onBlur={validateUrl}
                                        className={urlError ? 'input-error' : ''}
                                    />
                                    {urlError && (
                                        <div className="error-message">
                                            <AlertCircle size={16} />
                                            <span>{urlError}</span>
                                        </div>
                                    )}
                                </div>
                                <div className='enter-website-dimensions'>
                                    <h3>Enter website dimensions:</h3>
                                    <div className='website-dimensions'>
                                        <div className='dimension'>
                                            <input 
                                                type="number" 
                                                placeholder='Width' 
                                                value={width}
                                                onChange={(e) => setWidth(e.target.value)}
                                                className={dimensionsError ? 'input-error' : ''}
                                            />
                                            <span>px</span>
                                        </div>
                                        <X />
                                        <div className='dimension'>
                                            <input 
                                                type="number" 
                                                placeholder='Height' 
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                                onBlur={validateDimensions}
                                                className={dimensionsError ? 'input-error' : ''}
                                            />
                                            <span>px</span>
                                        </div>
                                    </div>
                                    {dimensionsError && (
                                        <div className="error-message">
                                            <AlertCircle size={16} />
                                            <span>{dimensionsError}</span>
                                        </div>
                                    )}
                                </div>
                                <div className='device-screen-orientation'>
                                    <Select.Root collection={devices}>
                                        <Select.Label className='device-screen-orientation-label'><h3>Device Type</h3></Select.Label>
                                        <Select.Control>
                                            <Select.Trigger>
                                            <Select.ValueText placeholder={device} />
                                            <Select.Indicator>
                                                <ChevronDownIcon />
                                            </Select.Indicator>
                                            </Select.Trigger>
                                        </Select.Control>
                                        <Portal>
                                            <Select.Positioner>
                                                <Select.Content className='add-website-dialog-select-options'>
                                                    <Select.ItemGroup>
                                                    {devices.items.map((item) => (
                                                        <Select.Item key={item} item={item} onClick={() => setDevice(item)}>
                                                            <Select.ItemText>{item}</Select.ItemText>
                                                        </Select.Item>
                                                    ))}
                                                    </Select.ItemGroup>
                                                </Select.Content>
                                            </Select.Positioner>
                                        </Portal>
                                        <Select.HiddenSelect />
                                    </Select.Root>
                                    <Select.Root collection={screen_orientations}>
                                        <Select.Label className='device-screen-orientation-label'><h3>Device Orientation</h3></Select.Label>
                                        <Select.Control>
                                            <Select.Trigger>
                                            <Select.ValueText placeholder={screenOrientation} />
                                            <Select.Indicator>
                                                <ChevronDownIcon />
                                            </Select.Indicator>
                                            </Select.Trigger>
                                        </Select.Control>
                                        <Portal>
                                            <Select.Positioner>
                                                <Select.Content className='add-website-dialog-select-options'>
                                                    <Select.ItemGroup>
                                                    {screen_orientations.items.map((item) => (
                                                        <Select.Item key={item} item={item} onClick={() => setScreenOrientation(item)} >
                                                            <Select.ItemText>{item}</Select.ItemText>
                                                        </Select.Item>
                                                    ))}
                                                    </Select.ItemGroup>
                                                </Select.Content>
                                            </Select.Positioner>
                                        </Portal>
                                        <Select.HiddenSelect />
                                    </Select.Root>
                                </div>
                            </div>
                            <button 
                                className='start-monitoring-button'
                                onClick={handleSubmit}
                            >
                                <strong>Start Monitoring</strong>
                            </button>
                        </Dialog.Description>
                    </Dialog.Content>
                </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}

export default AddMonitoringRegistryButton;