import { Filter, X } from 'lucide-react';
import './Filters.css';
import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import { useEffect, useState } from 'react';
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

    const toggleWcagLevelFilter = (filter: string) => {
        setWcagLevelFilter(prev => 
            prev.includes(filter)
                ? prev.filter(item => item !== filter)
                : [...prev, filter]
        );
    };
    
    const toggleStatusFilter = (filter: string) => {
        setStatusFilter(prev => 
            prev.includes(filter)
                ? prev.filter(item => item !== filter)
                : [...prev, filter]
        );
    };

    const toggleGuidelineFilter = (filter: string) => {
        setGuidelineFilter(prev => 
            prev.includes(filter)
                ? prev.filter(item => item !== filter)
                : [...prev, filter]
        );
    };
    
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
                            <Dialog.CloseTrigger className="dialog-close-trigger"><X size={18} /></Dialog.CloseTrigger>
                        </div>
                        
                        <div className="filters-wrapper-2">
                            <div className='filters-wrapper'>
                                <div className='by-wcag-level'>
                                    <h3>WCAG Level</h3>
                                    <div className='wrapper-filters-options'>
                                        {wcagLevels.map((level) => (
                                            <Checkbox.Root key={level} checked={wcagLevelFilter.includes(level)}>
                                                <Checkbox.Control onClick={() => {toggleWcagLevelFilter(level)}}>
                                                    <Checkbox.Indicator>
                                                        <CheckIcon />
                                                    </Checkbox.Indicator>
                                                </Checkbox.Control>
                                                <Checkbox.Label>{level}</Checkbox.Label>
                                                <Checkbox.HiddenInput className='checkbox-hidden-input'/>
                                            </Checkbox.Root>
                                        ))}
                                    </div>
                                </div>
                                <div className='by-state'>
                                    <h3>State</h3>
                                    <div className='wrapper-filters-options'>
                                        {states.map((state) => (
                                            <Checkbox.Root key={state} checked={statusFilter.includes(state)}>
                                                <Checkbox.Control onClick={() => {toggleStatusFilter(state)}}>
                                                    <Checkbox.Indicator>
                                                        <CheckIcon />
                                                    </Checkbox.Indicator>
                                                </Checkbox.Control>
                                                <Checkbox.Label>{state.charAt(0).toUpperCase() + state.slice(1)}</Checkbox.Label>
                                                <Checkbox.HiddenInput />
                                            </Checkbox.Root>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="by-guideline">
                                <h3>WCAG Guideline</h3>
                                <div className='wrapper-by-guideline'>
                                    {guidelines.map((guideline) => (
                                        <Checkbox.Root key={guideline.handle} checked={guidelineFilter.includes(guideline.num)}>
                                            <Checkbox.Control onClick={() => {toggleGuidelineFilter(guideline.num)}}>
                                                <Checkbox.Indicator>
                                                    <CheckIcon />
                                                </Checkbox.Indicator>
                                            </Checkbox.Control>
                                            <Checkbox.Label>{guideline.num} - {guideline.handle}</Checkbox.Label>
                                            <Checkbox.HiddenInput className='checkbox-hidden-input'/>
                                        </Checkbox.Root>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='wrapper-dialog-buttons'>
                            <button className='dialog-button' onClick={() => {
                                props.setStatusFilter(statusFilter);
                                props.setWcagLevelFilter(wcagLevelFilter);
                                props.setGuidelineFilter(guidelineFilter);
                            }}>Apply</button>
                            <button className='dialog-button' onClick={() => {
                                setStatusFilter([]);
                                setWcagLevelFilter([]);
                                setGuidelineFilter([]);
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