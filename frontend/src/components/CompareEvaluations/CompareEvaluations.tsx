import './CompareEvaluations.css'
import { useParams } from "react-router-dom";
import DashboardMenu from "../DashboardMenu/DashboardMenu";
import { createListCollection, Select } from "@ark-ui/react/select";
import { Portal } from "@ark-ui/react/portal";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from 'react';
import { getWebsiteMonitoringCycles } from '../../services/EvaluationService';

function CompareEvaluations() {
    const { monitoring_id } = useParams();

    const [monitoringCycles, setMonitoringCycles] = useState([]);

    useEffect(() => {
        const fetchMonitoredWebsites = async () => {
            if (!monitoring_id) return;
            
            const data = await getWebsiteMonitoringCycles(monitoring_id);
            setMonitoringCycles(data);
            console.log(data);
        }

        fetchMonitoredWebsites();
    }, [monitoring_id]);

    const items = createWebsiteCyclesCollection(monitoringCycles);

    const collection = createListCollection({
        items: items,
    });

    return (
        <div className="compare-evaluations">
            <DashboardMenu monitoring_id={String(monitoring_id)} />
            <div className='compare-evaluations-separator'>    
                {monitoring_id ? (
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
                                                            <Select.Item key={item.label} item={item}>
                                                                <Select.ItemText>{item.value}</Select.ItemText>
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
                                                            <Select.Item key={item.label} item={item}>
                                                                <Select.ItemText>{item.value}</Select.ItemText>
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
                                <button><strong>Compare</strong></button>
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

export default CompareEvaluations;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createWebsiteCyclesCollection(list: any) {
    const items: { label: string, value: string }[] = [];
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    list.forEach((cycle : any) => {
        if (cycle.cycle_date) {
            const date = `${cycle.cycle_date.day}/${cycle.cycle_date.month}/${cycle.cycle_date.year}`;
            console.log(date);
            items.push({ 
            label: date, 
            value: date
            });
        }
    });
    
    return items;
}