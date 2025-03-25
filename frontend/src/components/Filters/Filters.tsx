import { Filter, X } from 'lucide-react';
import './Filters.css';
import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import { useState } from 'react';

interface FiltersProps {
    wcagLevels: string[];
    status: string[];
    setStatusFilter: React.Dispatch<React.SetStateAction<string[]>>;
    setWcagLevelFilter: React.Dispatch<React.SetStateAction<string[]>>;
}

function Filters(props: FiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const states = ["Passed", "Failed", "Warning", "Inapplicable"];
    const wcagLevels = ["A", "AA", "AAA"];
    
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
                        
                        <div className='filters-wrapper'>
                            <div className='by-wcag-level'>
                                <h3>WCAG Level</h3>
                                <div className='wrapper-filters-options'>
                                    {wcagLevels.map((level) => (
                                        <Checkbox.Root>
                                            <Checkbox.Control>
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
                                        <Checkbox.Root>
                                            <Checkbox.Control>
                                                <Checkbox.Indicator>
                                                    <CheckIcon />
                                                </Checkbox.Indicator>
                                            </Checkbox.Control>
                                            <Checkbox.Label>{state}</Checkbox.Label>
                                            <Checkbox.HiddenInput />
                                        </Checkbox.Root>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='wrapper-dialog-buttons'>
                            <button className='dialog-button' onClick={() => setIsOpen(false)}>Apply</button>
                            <button className='dialog-button' onClick={() => setIsOpen(false)}>Clear</button>
                        </div>
                    </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
}

export default Filters;