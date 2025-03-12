import './IssuesListWidget.css';
import { ChevronDown, Filter, X } from 'lucide-react';
import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { Dialog } from '@ark-ui/react/dialog'
import { RadioGroup } from '@ark-ui/react/radio-group'
import { useState } from 'react';
import { CheckIcon, FailIcon, Warning2Icon, InapplicableIcon } from '../../assets/Icons'
import IssuesWebsiteItem from '../IssuesWebsiteItem/IssuesWebsiteItem';
import { EvaluationData } from '../Types/Types.tsx';
import mockEvaluationData from '../MockEvalData/MockEvalData.tsx.ts';

interface ExpandedItems {
    [url: string]: boolean;
}

function IssuesListWidget() {
    const [selectedState, setSelectedState] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});

    const collection = createListCollection({
        items: [
          { label: 'By webpage', value: 'react' },
          { label: 'By test', value: 'solid' },
        ],
    });

    const wcagLevels = ['A', 'AA', 'AAA']
    const states = ['Success', 'Warning', 'Failed', 'Inapplicable']

    const mockEvalData : EvaluationData = mockEvaluationData;

    const toggleExpand = (url : string) => {
        setExpandedItems(prev => ({
            ...prev,
            [url]: !prev[url]
        }));
    };

    return (
        <div className='issues-container'>
            <div className="header">
                <div className='pills'>
                    <div className="title-pill"><h2>Current Accessibility Issues</h2></div>
                    <div className='filter-pills'>
                        <Select.Root collection={collection}>
                            <Select.Label className="sr-only">
                                <strong>Current website</strong>
                            </Select.Label>
                            <Select.Control className='select-control'>
                                <Select.Trigger className="select-trigger">
                                    <strong><Select.ValueText className="select-value" placeholder='By webpage' /></strong>
                                    <Select.Indicator className="select-indicator">
                                        <ChevronDown size={20} />
                                    </Select.Indicator>
                                </Select.Trigger>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content className="select-content">
                                        <Select.ItemGroup className="select-item-group">
                                            {collection.items.map((item) => (
                                                <Select.Item key={item.value} item={item} className="select-item">
                                                    <Select.ItemText>{item.label}</Select.ItemText>
                                                </Select.Item>
                                            ))}
                                        </Select.ItemGroup>
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                            <Select.HiddenSelect />
                        </Select.Root>
                        
                        <div className="stats-pill">
                            <div className="stat-success">
                                <span><strong>53</strong></span>
                                {CheckIcon}
                            </div>
                            <div className="stat-warning">
                                <span><strong>2</strong></span>
                                {Warning2Icon}
                            </div>
                            <div className="stat-fail">
                                <span><strong>4</strong></span>
                                {FailIcon}
                            </div>
                            <div className="stat-inapplicable">
                                <span><strong>4</strong></span>
                                <div className='circle'>
                                    {InapplicableIcon}
                                </div>
                            </div>
                        </div>
                        

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
                                        <div className='by-state'>
                                            <RadioGroup.Root className="radio-group-1">
                                                <RadioGroup.Label className="radio-group-label-1"><h3>State</h3></RadioGroup.Label>
                                                <RadioGroup.Indicator />
                                                {wcagLevels.map((level) => (
                                                    <RadioGroup.Item 
                                                        key={level} 
                                                        value={level} 
                                                        className="radio-group-item"
                                                        data-state={selectedLevel === level ? "checked" : "unchecked"}
                                                        onClick={() => setSelectedLevel(level)}
                                                    >
                                                        <RadioGroup.ItemText className="radio-group-item-text">{level}</RadioGroup.ItemText>
                                                        <RadioGroup.ItemControl className="radio-group-item-control" />
                                                        <RadioGroup.ItemHiddenInput 
                                                            className="radio-group-item-hidden-input"
                                                            checked={selectedLevel === level}
                                                            onChange={() => setSelectedLevel(level)}
                                                            name="input-1"
                                                        />
                                                    </RadioGroup.Item>
                                                ))}
                                            </RadioGroup.Root>
                                        </div>
                                        <div className='by-wcag-level'>
                                            <RadioGroup.Root className="radio-group-2">
                                                <RadioGroup.Label className="radio-group-label-2"><h3>WCAG Level</h3></RadioGroup.Label>
                                                <RadioGroup.Indicator />
                                                {states.map((state) => (
                                                    <RadioGroup.Item 
                                                        key={state} 
                                                        value={state} 
                                                        className="radio-group-item"
                                                        data-state={selectedState === state ? "checked" : "unchecked"}
                                                        onClick={() => setSelectedState(state)}
                                                    >
                                                        <RadioGroup.ItemText className="radio-group-item-text">{state}</RadioGroup.ItemText>
                                                        <RadioGroup.ItemControl className="radio-group-item-control" />
                                                        <RadioGroup.ItemHiddenInput 
                                                            className="radio-group-item-hidden-input"
                                                            checked={selectedState === state}
                                                            onChange={() => setSelectedState(state)}
                                                            name="input-2"
                                                        />
                                                    </RadioGroup.Item>
                                                ))}
                                            </RadioGroup.Root>
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
                    </div>
                </div>
            </div>
            
            <div className="issues-list">
                {Object.keys(mockEvalData).map((url) => (
                    <IssuesWebsiteItem 
                        key={url}
                        url={url}
                        evalData={mockEvalData}
                        expandedItems={expandedItems}
                        toggleExpand={toggleExpand}
                    />
                ))}
            </div>
        </div>
    );
}

export default IssuesListWidget;