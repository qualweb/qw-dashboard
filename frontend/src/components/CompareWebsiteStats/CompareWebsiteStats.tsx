import { useEffect, useState } from 'react';
import { DownIcon, MinusIcon, UpIcon } from '../../assets/Icons';
import './CompareWebsiteStats.css'
import { useMonitoringApi } from '../../services/EvaluationService';
import FailedTestsStatsList from '../FailedTestsStatsList/FailedTestsStatsList';
import ContinuousChart from '../ContinuousChart/ContinuousChart';
import SelectWidget from '../SelectWidget/SelectWidget';
import { createListCollection } from '@ark-ui/react/collection';

interface CompareWebsiteStatsProps {
    monitoring_id: string;
    first_cycle: string;
    second_cycle: string;
}

function CompareWebsiteStats(props: CompareWebsiteStatsProps) {
    const { getMonitoredWebpages, getWebpageComparisonData, getChartData } = useMonitoringApi();

    const [webpages, setWebpages] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [metric, setMetric] = useState('score');

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Set loading to false after 1 second
        }, 1000);
    
        return () => clearTimeout(timer);
    }, []);

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
    
    const pagesWithHighFailsFirst = fst_cycle_data.filter(data => (data.total_fails || 0) > 1).length;
    const pagesWithHighFailsSecond = snd_cycle_data.filter(data => (data.total_fails || 0) > 1).length;
    const improvement_high_fail_pages = pagesWithHighFailsSecond - pagesWithHighFailsFirst;
    
    const totalFirstPassedInstances = fst_cycle_data.reduce((sum, data) => sum + (data.passed_instances || 0), 0);
    const totalFirstApplicableInstances = fst_cycle_data.reduce((sum, data) => sum + (data.applicable_instances || 0), 0);
    const totalSecondPassedInstances = snd_cycle_data.reduce((sum, data) => sum + (data.passed_instances || 0), 0);
    const totalSecondApplicableInstances = snd_cycle_data.reduce((sum, data) => sum + (data.applicable_instances || 0), 0);

    const firstInacessibilityPercentage = totalFirstPassedInstances / totalFirstApplicableInstances;
    const secondInacessibilityPercentage = totalSecondPassedInstances / totalSecondApplicableInstances;
    const inacessibilityPercentageDiff = secondInacessibilityPercentage - firstInacessibilityPercentage;

    const stats = [
        {
            label: 'Average Score', 
            value: `${Math.floor(avgSecondScore * 100)}%`, 
            diff: improvement_score > 0.01 ? `+${Math.floor(improvement_score * 100)}` : improvement_score < -0.01 ? `${Math.floor(improvement_score * 100)}` : '0',
            diff_number: improvement_score,
            icon: improvement_score > 0.01 ? UpIcon : improvement_score < -0.01 ? DownIcon : MinusIcon
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
            value: (Math.floor(avgSecondFails * 100) / 100).toFixed(2), 
            diff: improvement_avg_fails > 0.01 ? `+${(Math.floor(improvement_avg_fails * 100) / 100).toFixed(2)}` : improvement_avg_fails < -0.01 ? `-${(Math.floor(improvement_avg_fails * 100) / 100).toFixed(2)}` : '0',
            diff_number: improvement_avg_fails,
            icon: improvement_avg_fails > 0.01 ? UpIcon : improvement_avg_fails < -0.01 ? DownIcon : MinusIcon
        },
        {
            label: 'Inaccessibility Percentage', 
            value: `${(Math.floor((secondInacessibilityPercentage * 10000) / 100).toFixed(0))}%`, 
            diff: inacessibilityPercentageDiff > 0.01 ? `+${(Math.floor(inacessibilityPercentageDiff * 10000) / 100).toFixed(2)}%` : inacessibilityPercentageDiff < -0.01 ? `-${(Math.floor(inacessibilityPercentageDiff * 10000) / 100).toFixed(2)}%` : '0%',
            diff_number: inacessibilityPercentageDiff,
            icon: inacessibilityPercentageDiff > 0.01 ? UpIcon : inacessibilityPercentageDiff < -0.01 ? DownIcon : MinusIcon
        }
    ];

    // Prepare data for continuous chart
    useEffect(() => {
        const fetchData = async () => {
            if (webpages.length === 0) return;
            
            try {
                // Fetch all comparison data
                const comparisonData = await Promise.all(
                    webpages.map(webpage => 
                        getChartData(webpage['id'], props.first_cycle, props.second_cycle)
                    )
                );
                
                console.log('Comparison Data:', comparisonData);
                
                if (comparisonData.length === 0) return;
                
                const numCycles = comparisonData[0].graph_data.length;
                
                // Initialize aggregated totals
                const totals = {
                    score: new Array(numCycles).fill(0),
                    fails: new Array(numCycles).fill(0),
                    passedInstances: new Array(numCycles).fill(0),
                    applicableInstances: new Array(numCycles).fill(0),
                    pagesWithMultipleFails: new Array(numCycles).fill(0)
                };
                
                // Aggregate data from all webpages
                comparisonData.forEach(data => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data.graph_data.forEach((cycleData: any, index: number) => {
                        const { score, total_fails, passed_instances, applicable_instances } = cycleData.data;
                        
                        totals.score[index] += score;
                        totals.fails[index] += total_fails;
                        totals.passedInstances[index] += passed_instances;
                        totals.applicableInstances[index] += applicable_instances;
                        
                        if (total_fails > 1) {
                            totals.pagesWithMultipleFails[index]++;
                        }
                    });
                });
                
                // Create final result
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const finalResult : any = Array.from({ length: numCycles }, (_, index) => ({
                    cycle_date: comparisonData[0].graph_data[index].cycle_date,
                    data: {
                        score: Math.floor((totals.score[index] / comparisonData.length) * 100),
                        total_fails: totals.fails[index],
                        inaccessibility_percentage: Math.floor((totals.passedInstances[index] / totals.applicableInstances[index]) * 100),
                        pages_with_more_than_one_fail: totals.pagesWithMultipleFails[index],
                        average_fails_per_page: totals.fails[index] / comparisonData.length
                    }
                }));
                
                console.log('Final Result:', finalResult);
                setChartData(finalResult);
                
            } catch (error) {
                console.error('Error fetching comparison data:', error);
            }
        };
        
        fetchData();
    }, [webpages, props.first_cycle, props.second_cycle]);

    return (
        <div className='compare-website-stats-container'>
            {!isLoading ? (
                <>
                    <div className='compare-website-stats'>
                        {stats.map((stat, index) => (
                            <div className='compare-website-stat' key={index}>
                                <h3>{stat.label}</h3>
                                <div className='stat-value'>
                                    <strong><span>{stat.value}</span></strong>
                                    <div className='stat-diff'>
                                        {stat.diff_number > 0.01 && (<span><strong>{stat.diff}</strong></span>)}
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='failed-tests-stats-list-container'>
                        <FailedTestsStatsList
                            monitoring_id={props.monitoring_id}
                            first_cycle={props.first_cycle}
                            second_cycle={props.second_cycle}
                        />
                    </div>
                    <div className='continuous-chart-wrapper'>
                        <div className='continuous-chart-header'>
                            <h3 className='continuous-chart-title'>Continuous Progress Chart</h3>
                        </div>
                        <div className='select-metric-container'>
                            <SelectWidget
                                label='Select Metric'
                                placeholder='Select a metric...'
                                collection={createListCollection({
                                    items: [
                                        { label: 'Score', value: 'score' },
                                        { label: 'Total Fails', value: 'total_fails' },
                                        { label: 'Inaccessibility Percentage', value: 'inaccessibility_percentage' },
                                        { label: 'Pages with > 1 Fail', value: 'pages_with_more_than_one_fail' },
                                        { label: 'Average Fails per Page', value: 'average_fails_per_page' }
                                    ]
                                })}
                                onValueChange={setMetric}
                                defaultValues={[metric]}
                            />
                        </div>
                        <div className="continuous-website-chart">
                            <div className='continuous-chart-container'>
                                <ContinuousChart
                                    chartData={chartData}
                                    selectedMetric={metric}
                                />
                            </div>
                        </div>
                    </div>
                </>
            ): null}
        </div>
    );
}

export default CompareWebsiteStats;