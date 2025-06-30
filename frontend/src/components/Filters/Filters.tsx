import { Filter, X } from 'lucide-react';
import './Filters.css';
import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react';
import wcagGuidelinesJson from './wcag_guidelines.json'

interface FiltersProps {
    wcagGuidelines: string[];
    wcagLevels: string[];
    status: string[];
    setGuidelineFilter: React.Dispatch<React.SetStateAction<string[]>>;
    setStatusFilter: React.Dispatch<React.SetStateAction<string[]>>;
    setWcagLevelFilter: React.Dispatch<React.SetStateAction<string[]>>;
}

function Filters(props: FiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const states = ["passed", "warning", "failed", "inapplicable"];
    const wcagLevels = ["A", "AA", "AAA"];

    const guidelines = extractGuidelines(wcagGuidelinesJson);

    console.log('wcagGuidelines', guidelines);

    const [wcagLevelFilter, setWcagLevelFilter] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const [guidelineFilter, setGuidelineFilter] = useState<string[]>([]);

    useEffect(() => {
        setStatusFilter(props.status);
        setWcagLevelFilter(props.wcagLevels);
        setGuidelineFilter(props.wcagGuidelines);
    }, [props.status, props.wcagLevels, props.wcagGuidelines]);

    const hiddenInputWcagLevelsRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const hiddenInputStatesRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const hiddenInputGuidelinesRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
    
    return (
        <>
            <button className="dialog-trigger" onClick={() => setIsOpen(true)}>
                <Filter size={18} />
                <strong>Filters</strong>
            </button>
            <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
                <Portal>
                    <Dialog.Backdrop className="dialog-backdrop" />
                    <Dialog.Positioner className="dialog-positioner">
                    <Dialog.Content className="dialog-content">
                        <div className='dialog-header'>
                            <Dialog.Title className="dialog-title">Filters</Dialog.Title>
                            <Dialog.CloseTrigger className="dialog-close-trigger" aria-label='Close dialog' ><X size={18} /></Dialog.CloseTrigger>
                        </div>
                        
                        <div className="filters-wrapper-2">
                            <div className='filters-wrapper'>
                                <div className='by-wcag-level'>
                                    <h3>WCAG Level</h3>
                                    <Checkbox.Group 
                                        className='wrapper-filters-options' 
                                        onValueChange={(details) => {
                                            const selectedValues = Array.from(details.values());
                                            
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            const newWcagFilters : any[] = [];
                                            
                                            selectedValues.forEach(value => {
                                                const item = wcagLevels.find(item => item === value);
                                                if (item) {
                                                    newWcagFilters.push(item);
                                                }
                                            });

                                            console.log('New WCAG Filters:', newWcagFilters);
                                            
                                            setWcagLevelFilter(newWcagFilters);
                                        }}
                                    >
                                        {wcagLevels.map((level) => (
                                            <Checkbox.Root 
                                                key={level}
                                                value={level}
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === ' ') {
                                                        e.preventDefault();
                                                        
                                                        hiddenInputWcagLevelsRefs.current[level]?.click();
                                                    }
                                                }}
                                                aria-label={level}
                                                role='checkbox'
                                                aria-checked={wcagLevelFilter.some(item => item === level)}
                                            >
                                                <Checkbox.HiddenInput className='checkbox-hidden-input'
                                                    ref={(el) => {
                                                        hiddenInputWcagLevelsRefs.current[level] = el;
                                                    }}
                                                    onClick={() => {
                                                        console.log('Checkbox clicked:', level);
                                                    }}
                                                    tabIndex={-1}
                                                />
                                                <Checkbox.Control>
                                                    <Checkbox.Indicator>
                                                        <CheckIcon />
                                                    </Checkbox.Indicator>
                                                </Checkbox.Control>
                                                <Checkbox.Label>{level}</Checkbox.Label>
                                            </Checkbox.Root>
                                        ))}
                                    </Checkbox.Group>
                                </div>
                                <div className='by-state'>
                                    <h3>State</h3>
                                    <Checkbox.Group 
                                        className='wrapper-filters-options' 
                                        onValueChange={(details) => {
                                            const selectedValues = Array.from(details.values());
                                            
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            const newStateFilters : any[] = [];
                                            
                                            selectedValues.forEach(state => {
                                                const item = states.find(item => item === state);
                                                if (item) {
                                                    newStateFilters.push(item);
                                                }
                                            });

                                            setStatusFilter(newStateFilters);
                                        }}
                                    >
                                        {states.map((state) => (
                                            <Checkbox.Root 
                                                value={state} 
                                                key={state} 
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === ' ') {
                                                        e.preventDefault();
                                                        
                                                        hiddenInputStatesRefs.current[state]?.click();
                                                    }
                                                }}
                                                aria-label={state}
                                                role='checkbox'
                                                aria-checked={statusFilter.some(item => item === state)}
                                            >
                                                <Checkbox.Control>
                                                    <Checkbox.Indicator>
                                                        <CheckIcon />
                                                    </Checkbox.Indicator>
                                                </Checkbox.Control>
                                                <Checkbox.Label>{state.charAt(0).toUpperCase() + state.slice(1)}</Checkbox.Label>
                                                <Checkbox.HiddenInput className='checkbox-hidden-input'
                                                    ref={(el) => {
                                                        hiddenInputStatesRefs.current[state] = el;
                                                    }}
                                                    onClick={() => {
                                                        console.log('Checkbox clicked:', state);
                                                    }}
                                                    tabIndex={-1}
                                                />
                                            </Checkbox.Root>
                                        ))}
                                    </Checkbox.Group>
                                </div>
                            </div>
                            <div className="by-guideline">
                                <h3>WCAG Guideline</h3>
                                <Checkbox.Group 
                                    className='wrapper-by-guideline' 
                                    onValueChange={(details) => {
                                        const selectedValues = Array.from(details.values());
                                        
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        const newGuidelinesFilters : any[] = [];
                                        
                                        selectedValues.forEach(value => {
                                            const item = guidelines.find(item => item.num === value);
                                            if (item) {
                                                newGuidelinesFilters.push(item.num);
                                            }
                                        });

                                        setGuidelineFilter(newGuidelinesFilters);
                                    }}
                                >
                                    {guidelines.map((guideline) => (
                                        <Checkbox.Root 
                                            key={guideline.num} 
                                            value={guideline.num}
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === ' ') {
                                                    e.preventDefault();
                                                    
                                                    hiddenInputGuidelinesRefs.current[guideline.num]?.click();
                                                }
                                            }}
                                            aria-label={guideline.num + " - " + guideline.handle}
                                            role='checkbox'
                                            aria-checked={guidelineFilter.some(item => item === guideline.num)}
                                        >
                                            <Checkbox.Control>
                                                <Checkbox.Indicator>
                                                    <CheckIcon />
                                                </Checkbox.Indicator>
                                            </Checkbox.Control>
                                            <Checkbox.Label>{guideline.num} - {guideline.handle}</Checkbox.Label>
                                            <Checkbox.HiddenInput className='checkbox-hidden-input' 
                                                ref={(el) => {
                                                    hiddenInputGuidelinesRefs.current[guideline.num] = el;
                                                }}
                                                onClick={() => {
                                                    console.log('Checkbox clicked:', guideline.num);
                                                }}
                                                tabIndex={-1}
                                            />
                                        </Checkbox.Root>
                                    ))}
                                </Checkbox.Group>
                            </div>
                        </div>
                        <div className='wrapper-dialog-buttons'>
                            <button className='dialog-button' onClick={() => {
                                props.setStatusFilter(statusFilter);
                                props.setWcagLevelFilter(wcagLevelFilter);
                                props.setGuidelineFilter(guidelineFilter);

                                setIsOpen(false)
                            }}>Apply</button>
                            <button className='dialog-button' onClick={() => {
                                setStatusFilter([]);
                                setWcagLevelFilter([]);
                                setGuidelineFilter([]);

                                props.setStatusFilter([]);
                                props.setWcagLevelFilter([]);
                                props.setGuidelineFilter([]);
                                
                                setIsOpen(false);
                            }}>Clear</button>
                        </div>
                    </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
}

export default Filters;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractGuidelines(wcagData: any): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const guidelines : any[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    wcagData.principles.forEach((principle : any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        principle.guidelines.forEach((guideline : any) => {
        guidelines.push({
            handle: guideline.handle,
            num: guideline.num
        });
        });
    });

    return guidelines;
}