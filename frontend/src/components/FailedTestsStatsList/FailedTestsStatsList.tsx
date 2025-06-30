import { useEffect, useState } from 'react';
import './FailedTestsStatsList.css'
import { useMonitoringApi } from '../../services/EvaluationService';
import FailedTest from '../FailedTest/FailedTest';

interface FailedTestsStatsListProps {
    monitoring_id: string;
    first_cycle: string;
    second_cycle: string;
}

function FailedTestsStatsList(props: FailedTestsStatsListProps) {
    const { getFailedTestsStats } = useMonitoringApi();

    const [fstCycleData, setFstCycleData] = useState([]);
    const [sndCycleData, setSndCycleData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getFailedTestsStats(props.monitoring_id, props.first_cycle, props.second_cycle);
            
            console.log(data)

            setFstCycleData(data['first_cycle_failed_tests']['failed_tests']);
            setSndCycleData(data['second_cycle_failed_tests']['failed_tests']);
        };
        fetchData();
        
    }, [props.monitoring_id, props.first_cycle, props.second_cycle]);

    return (
        <div className="failed-tests-stats-list">
            <h3 className='failed-tests-title'>Failed Tests</h3>
            <ul className="failed-tests-list">
                {sndCycleData && sndCycleData.map((rule, index) => (
                    <FailedTest
                        assertion_name={rule['assertion_name']}
                        assertion_code={rule['assertion_code']}
                        webpages={rule['webpages']}
                        diff={rule['webpages']['length'] - fstCycleData[index]['webpages']['length']}
                        new_webpages={getUniqueElementsNotInFirst(fstCycleData[index]['webpages'], rule['webpages'])}
                    />
                ))}
            </ul>
        </div>
    );
}

export default FailedTestsStatsList;

function getUniqueElementsNotInFirst<T>(arr1: T[], arr2: T[]): T[] {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    
    return Array.from(set2).filter(item => !set1.has(item));
}