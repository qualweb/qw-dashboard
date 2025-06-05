import { useEffect, useState } from 'react';
import './FailedTestsStatsList.css'
import { getFailedTestsStats } from '../../services/EvaluationService';
import FailedTest from '../FailedTest/FailedTest';

interface FailedTestsStatsListProps {
    monitoring_id: string;
    first_cycle: string;
    second_cycle: string;
}

function FailedTestsStatsList(props: FailedTestsStatsListProps) {

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
                    />
                ))}
            </ul>
        </div>
    );
}

export default FailedTestsStatsList;