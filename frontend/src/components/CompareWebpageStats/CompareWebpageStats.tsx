import { useEffect, useState } from 'react';
import { DownIcon, UpIcon, MinusIcon } from '../../assets/Icons';
import './CompareWebpageStats.css'
import { useMonitoringApi } from '../../services/EvaluationService';

interface CompareWebpageStatsProps {
    webpage_id: string;
    first_cycle: string;
    second_cycle: string;
}

function CompareWebpageStats(props: CompareWebpageStatsProps) {
    const { getWebpageComparisonData } = useMonitoringApi();

    const [fst_cycle_data, setFstCycleData] = useState();
    const [snd_cycle_data, setSndCycleData] = useState();

    useEffect(() => {
        const fetchWebpageComparisonData = async () => {
            const data = await getWebpageComparisonData(props.webpage_id, props.first_cycle, props.second_cycle);
            setFstCycleData(data.first_cycle);
            setSndCycleData(data.second_cycle);
        };

        fetchWebpageComparisonData();
    }, [props.webpage_id, props.first_cycle, props.second_cycle]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let stats: any[] = [];

    if (fst_cycle_data && snd_cycle_data) {
        const improvement_score = snd_cycle_data['score'] - fst_cycle_data['score'];
        const improvement_total_fails = snd_cycle_data['total_fails'] - fst_cycle_data['total_fails'];
        

        const firstPassedInstances = fst_cycle_data['passed_instances'];
        const firstApplicableInstances = fst_cycle_data['applicable_instances'];
        const secondPassedInstances = snd_cycle_data['passed_instances'];
        const secondApplicableInstances = snd_cycle_data['applicable_instances'];

        const firstInacessibilityPercentage = firstPassedInstances / firstApplicableInstances;
        const secondInacessibilityPercentage = secondPassedInstances / secondApplicableInstances;

        const inaccessibilityDiff = secondInacessibilityPercentage - firstInacessibilityPercentage;
        
        stats = [
            {label: 'Score', value: Math.floor(snd_cycle_data['score'] * 100), diff: improvement_score > 0 ? `+${Math.floor(improvement_score * 100)}` : improvement_score < 0 ? `${improvement_score}` : '0', diff_number: improvement_score , icon: improvement_score > 0 ? UpIcon : improvement_score < 0 ? DownIcon : MinusIcon},
            {label: 'Total fails', value: snd_cycle_data['total_fails'], diff: improvement_total_fails > 0 ? `+${improvement_total_fails}` : improvement_total_fails < 0 ? `${improvement_total_fails}` : '0', diff_number: improvement_total_fails, icon: improvement_total_fails > 0 ? UpIcon : improvement_total_fails < 0 ? DownIcon : MinusIcon},
            {label: 'Inaccessibility Percentage', value: `${Math.floor(secondInacessibilityPercentage * 100)}%`, diff: inaccessibilityDiff > 0 ? `+${Math.floor(inaccessibilityDiff * 100)}%` : inaccessibilityDiff < 0 ? `${Math.floor(inaccessibilityDiff * 100)}%` : '0%', diff_number: inaccessibilityDiff, icon: inaccessibilityDiff > 0 ? UpIcon : inaccessibilityDiff < 0 ? DownIcon : MinusIcon}            
        ]
    }

    return (
        <div className='compare-website-stats'>
            {stats.map((stat) => (
                <div className='compare-website-stat' key={stat.label}>
                    <h3>{stat.label}</h3>
                    <div className='stat-value'>
                        <strong><span>{stat.value}</span></strong>
                        <div className='stat-diff'>
                            {stat.diff_number > 0 && (<span><strong>{stat.diff}</strong></span>)}
                            {stat.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CompareWebpageStats;