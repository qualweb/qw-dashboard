import './SelectEvaluations.css'
import { Link, useParams } from "react-router-dom";
import DashboardMenu from "../DashboardMenu/DashboardMenu";
import { createListCollection, Select } from "@ark-ui/react/select";
import { Portal } from "@ark-ui/react/portal";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from 'react';
import { getWebsiteMonitoringCycles } from '../../services/EvaluationService';
import WebsiteIdentifier from '../WebsiteIdentifier/WebsiteIdentifier';

function SelectEvaluations() {
    const { monitoring_id } = useParams();

    const [monitoringCycles, setMonitoringCycles] = useState([]);
    const [first_cycle, setFirstCycle] = useState('');
    const [second_cycle, setSecondCycle] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);

    
    useEffect(() => {
        const fetchMonitoredWebsites = async () => {
            if (!monitoring_id) return;
            
            const data = await getWebsiteMonitoringCycles(monitoring_id);
            setMonitoringCycles(data);
            console.log(data);
        }
        
        fetchMonitoredWebsites();
    }, [monitoring_id]);
    
    useEffect(() => {
        if (first_cycle && second_cycle) {
            setIsEnabled(true);
        } else {
            setIsEnabled(false);
        }
    }, [first_cycle, second_cycle]);

    const items = createWebsiteCyclesCollection(monitoringCycles);

    const collection = createListCollection({
        items: items,
    });

    return (
        <div className="select-evaluations">
            <DashboardMenu monitoring_id={String(monitoring_id)} />
            <div className='compare-evaluations-separator'>    
                {monitoring_id ? (
                    <div className='select-evaluations-container'>
                        <WebsiteIdentifier monitoring_id={String(monitoring_id)} />
                        <div className="compare-evaluations-wrapper">
                            <h3>Compare Evaluations</h3>
                            <div className='evaluations-selection-button-wrapper'>
                                <div className="evaluations-selection">
                                    <div className="evaluation-1">
                                        <Select.Root collection={collection}>
                                            <Select.Label className='select-website-label'>
                                                <strong>First monitoring cycle</strong>
                                            </Select.Label>
                                            <Select.Control>
                                                <Select.Trigger>
                                                    <Select.ValueText placeholder="Select a monitoring cycle" />
                                                    <Select.Indicator>
                                                        <ChevronDownIcon />
                                                    </Select.Indicator>
                                                </Select.Trigger>
                                            </Select.Control>
                                            <Portal>
                                                <Select.Positioner>
                                                    <Select.Content>
                                                        <Select.ItemGroup>
                                                            {collection.items.map((item) => (
                                                                <Select.Item key={item.value} item={item} onClick={() =>
                                                                    setFirstCycle(item.value)
                                                                }>
                                                                    <Select.ItemText>{item.label}</Select.ItemText>
                                                                </Select.Item>
                                                            ))}
                                                        </Select.ItemGroup>
                                                    </Select.Content>
                                                </Select.Positioner>
                                            </Portal>
                                            <Select.HiddenSelect />
                                        </Select.Root>
                                    </div>
                                    <div className="evaluation-2">
                                        <Select.Root collection={collection}>
                                            <Select.Label className='select-website-label'>
                                                <strong>Second monitoring cycle</strong>
                                            </Select.Label>
                                            <Select.Control>
                                                <Select.Trigger>
                                                    <Select.ValueText placeholder="Select a monitoring cycle" />
                                                    <Select.Indicator>
                                                        <ChevronDownIcon />
                                                    </Select.Indicator>
                                                </Select.Trigger>
                                            </Select.Control>
                                            <Portal>
                                                <Select.Positioner>
                                                    <Select.Content>
                                                        <Select.ItemGroup>
                                                            {collection.items.map((item) => (
                                                                <Select.Item key={item.value} item={item} onClick={() =>
                                                                    setSecondCycle(item.value)
                                                                }>
                                                                    <Select.ItemText>{item.label}</Select.ItemText>
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
                                <div className='compare-evaluations-button-wrapper'>
                                    {isEnabled ? (
                                        <Link className='compare-evaluations-button' to={`/dashboard/${monitoring_id}/compare-evaluations/${first_cycle}/${second_cycle}`}>
                                            <strong>Compare</strong>
                                        </Link>
                                    ) : (
                                        <button className='compare-evaluations-button' disabled>
                                            <strong>Compare</strong>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="loading-error">
                        <h1>It was not possible to load content</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SelectEvaluations;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createWebsiteCyclesCollection(list: any) {
    const items: { label: string, value: string }[] = [];
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    list.forEach((cycle : any) => {
        if (cycle.cycle_date) {
            const date = `${cycle.cycle_date.day}/${cycle.cycle_date.month}/${cycle.cycle_date.year} - ${cycle.cycle_date.hour}:${cycle.cycle_date.minute}:${cycle.cycle_date.second}`;
            console.log(date);
            items.push({ 
                label: date, 
                value: cycle.id
            });
        }
    });
    
    return items;
}