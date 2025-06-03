import './AddMonitoringRegistryButton.css'
import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { createListCollection, Select } from '@ark-ui/react/select';
import { ChevronDownIcon, X, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { addLatestEvalsMonitoringCycle, calculateScores, createMonitoringCycle, getMonitoredWebpages, runCrawler, runEvaluation } from '../../services/EvaluationService';

interface AddMonitoringRegistryButtonProps {
    user_id: number;
    onChange: () => void;
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
                
                for (const webpage of webpages) {
                    await runEvaluation(String(monitoring_registry_id), webpage['id'], webpage['needs_authentication']);
                }
                
                const monitoring_cycle_id = await createMonitoringCycle(String(monitoring_registry_id));

                await addLatestEvalsMonitoringCycle(monitoring_cycle_id);
            
                await calculateScores(String(monitoring_registry_id));

                props.onChange();
            }
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
                            <Dialog.CloseTrigger className='add-website-dialog-close'><X /></Dialog.CloseTrigger>
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