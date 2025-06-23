import { ChevronUp, GlobeIcon } from 'lucide-react';
import './WebpageStats.css'
import { useEffect, useState } from 'react';
import CompareWebpageStats from '../CompareWebpageStats/CompareWebpageStats';
import ContinuousChart from '../ContinuousChart/ContinuousChart';
import { useMonitoringApi } from '../../services/EvaluationService';
import SelectWidget from '../SelectWidget/SelectWidget';
import { createListCollection } from '@ark-ui/react/collection';

interface WebpageStatsProps {
    webpage_id: string;
    webpage_url: string;
    first_cycle: string;
    second_cycle: string;
}

function WebpageStats(props: WebpageStatsProps) {
    const { getChartData } = useMonitoringApi();

    const [expanded, setExpanded] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [metric, setMetric] = useState('score');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getChartData(props.webpage_id, props.first_cycle, props.second_cycle);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.graph_data = data.graph_data.map((item: any) => {
                return {
                    ...item,
                    data: {
                        score: Math.floor(item.data.score * 100),
                        total_fails: item.data.total_fails,
                        inaccessibility_percentage: Math.floor((item.data.passed_instances / item.data.applicable_instances) * 100),
                    }
                };
            });


            setChartData(data.graph_data);
        };

        fetchData();
    }, [props.webpage_id, props.first_cycle, props.second_cycle]);

    return (
        <button className="webpage-item" key={props.webpage_id} onClick={() => setExpanded(!expanded)} style={{
            borderColor: expanded ? '#ffffff' : '',
        }}>
            <div className='webpage-item-header'>
                <div className='webpage-icon-url'>
                    <GlobeIcon />
                    <h3>{props.webpage_url}</h3>
                </div>
                <div className='see-comparison'>
                    <strong><span>See Comparison</span></strong>
                    <ChevronUp style={{
                        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                    }}/>
                </div>
            </div>
            {expanded && (
                <div>
                    <CompareWebpageStats
                        webpage_id={props.webpage_id}
                        first_cycle={props.first_cycle}
                        second_cycle={props.second_cycle}
                    />
                    <SelectWidget
                        label='Select Metric'
                        placeholder='Select a metric...'
                        collection={createListCollection({
                            items: [
                                { label: 'Score', value: 'score' },
                                { label: 'Total Fails', value: 'total_fails' },
                                { label: 'Inaccessibility Percentage', value: 'inaccessibility_percentage' }
                            ]
                        })}
                        onValueChange={setMetric}
                        defaultValues={[metric]}
                    />
                    
                    <ContinuousChart
                        chartData={chartData}
                        selectedMetric={metric}
                    />
                </div>
            )}
        </button>
    );
}

export default WebpageStats;