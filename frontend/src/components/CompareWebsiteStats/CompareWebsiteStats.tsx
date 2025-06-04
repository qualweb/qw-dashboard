import { useEffect, useState } from 'react';
import { DownIcon, MinusIcon, UpIcon } from '../../assets/Icons';
import './CompareWebsiteStats.css'
import { getMonitoredWebpages, getWebpageComparisonData } from '../../services/EvaluationService';

interface CompareWebsiteStatsProps {
    monitoring_id: string;
    first_cycle: string;
    second_cycle: string;
}

function CompareWebsiteStats(props: CompareWebsiteStatsProps) {
    const [webpages, setWebpages] = useState([]);

    useEffect(() => {
        const fetchWebpages = async () => {
            const data = await getMonitoredWebpages(props.monitoring_id);
            setWebpages(data);
        };
        fetchWebpages();
    }
    , [props.monitoring_id]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [fst_cycle_data, setFstCycleData] = useState<any[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [snd_cycle_data, setSndCycleData] = useState<any[]>([]);

    useEffect(() => {
        const fetchWebsiteComparisonData = async () => {
            if (webpages.length === 0) return;
            
            try {
                // Use Promise.all to wait for all async operations
                const comparisonPromises = webpages.map(async (webpage) => {
                    return await getWebpageComparisonData(webpage['id'], props.first_cycle, props.second_cycle);
                });
                
                const comparisonData = await Promise.all(comparisonPromises);
                
                // Extract first and second cycle data
                const firstCycleData = comparisonData.map(data => data.first_cycle);
                const secondCycleData = comparisonData.map(data => data.second_cycle);
                
                setFstCycleData(firstCycleData);
                setSndCycleData(secondCycleData);
            } catch (error) {
                console.error('Error fetching comparison data:', error);
            }
        };
        fetchWebsiteComparisonData();
    }, [webpages, props.first_cycle, props.second_cycle]);

    // Calculate aggregated stats
    const totalFirstScore = fst_cycle_data.reduce((sum, data) => sum + (data.score || 0), 0);
    const totalSecondScore = snd_cycle_data.reduce((sum, data) => sum + (data.score || 0), 0);
    const totalFirstFails = fst_cycle_data.reduce((sum, data) => sum + (data.total_fails || 0), 0);
    const totalSecondFails = snd_cycle_data.reduce((sum, data) => sum + (data.total_fails || 0), 0);

    const avgFirstScore = totalFirstScore / fst_cycle_data.length;
    const avgSecondScore = totalSecondScore / snd_cycle_data.length;
    const avgFirstFails = totalFirstFails / fst_cycle_data.length;
    const avgSecondFails = totalSecondFails / snd_cycle_data.length;

    const improvement_score = avgSecondScore - avgFirstScore;
    const improvement_total_fails = totalSecondFails - totalFirstFails;
    const improvement_avg_fails = avgSecondFails - avgFirstFails;

    // Count pages with more than 1 fail
    const pagesWithHighFailsFirst = fst_cycle_data.filter(data => (data.total_fails || 0) > 1).length;
    const pagesWithHighFailsSecond = snd_cycle_data.filter(data => (data.total_fails || 0) > 1).length;
    const improvement_high_fail_pages = pagesWithHighFailsSecond - pagesWithHighFailsFirst;

    const stats = [
        {
            label: 'Average Score', 
            value: Math.floor(avgSecondScore * 100), 
            diff: improvement_score > 0 ? `+${Math.floor(improvement_score * 100)}` : improvement_score < 0 ? `${Math.floor(improvement_score * 100)}` : '0',
            diff_number: improvement_score,
            icon: improvement_score > 0 ? UpIcon : improvement_score < 0 ? DownIcon : MinusIcon
        },
        {
            label: 'Total fails', 
            value: totalSecondFails, 
            diff: improvement_total_fails > 0 ? `+${improvement_total_fails}` : improvement_total_fails < 0 ? `-${improvement_total_fails}` : '0',
            diff_number: improvement_total_fails,
            icon: improvement_total_fails > 0 ? UpIcon : improvement_total_fails < 0 ? DownIcon : MinusIcon
        },
        {
            label: 'Pages with more than 1 fail', 
            value: pagesWithHighFailsSecond, 
            diff: improvement_high_fail_pages > 0 ? `+${improvement_high_fail_pages}` : improvement_high_fail_pages < 0 ? `-${improvement_high_fail_pages}` : '0',
            diff_number: improvement_high_fail_pages,
            icon: improvement_high_fail_pages > 0 ? UpIcon : improvement_high_fail_pages < 0 ? DownIcon : MinusIcon
        },
        {
            label: 'Average fails per page', 
            value: (Math.round(avgSecondFails * 100) / 100).toFixed(2), 
            diff: improvement_avg_fails > 0 ? `+${(Math.round(improvement_avg_fails * 100) / 100).toFixed(2)}` : improvement_avg_fails < 0 ? `-${(Math.round(improvement_avg_fails * 100) / 100).toFixed(2)}` : '0',
            diff_number: improvement_avg_fails,
            icon: improvement_avg_fails > 0 ? UpIcon : improvement_avg_fails < 0 ? DownIcon : MinusIcon
        },
    ];

    return (
        <div className='compare-website-stats'>
            {stats.map((stat, index) => (
                <div className='compare-website-stat' key={index}>
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

export default CompareWebsiteStats;