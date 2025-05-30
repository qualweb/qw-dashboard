import { Select } from '@ark-ui/react/select';
import './SelectWidget.css'
import { ChevronDownIcon } from 'lucide-react';
import { Portal } from '@ark-ui/react/portal';

interface ScheduleWidgetProps {
    label: string,
    placeholder?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection: Select.ListCollection<{ label: string; value: any; }>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onValueChange: (value: React.SetStateAction<any>) => void
}

function SelectWidget(props: ScheduleWidgetProps) {
    return (
        <Select.Root collection={props.collection}>
            <Select.Label className='select-schedule-type-label'><strong>{props.label}</strong></Select.Label>
            <Select.Control>
                <Select.Trigger className='select-schedule-type-trigger'>
                    <Select.ValueText placeholder={props.placeholder} />
                    <Select.Indicator>
                        <ChevronDownIcon />
                    </Select.Indicator>
                </Select.Trigger>
            </Select.Control>
            <Portal>
                <Select.Positioner className='select-schedule-type-positioner'>
                    <Select.Content className='select-schedule-type-content'>
                        <Select.ItemGroup className='select-group-item-schedule-type'>
                            {props.collection.items.map((item) => (
                                <Select.Item key={item.value} item={item} className='select-item-schedule-type' onClick={() => {
                                    props.onValueChange(item.value);
                                }}>
                                    <Select.ItemText>{item.label}</Select.ItemText>
                                </Select.Item>
                            ))}
                        </Select.ItemGroup>
                    </Select.Content>
                </Select.Positioner>
            </Portal>
            <Select.HiddenSelect />
        </Select.Root>
    );
}

export default SelectWidget;