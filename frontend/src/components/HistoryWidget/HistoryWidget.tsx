import { useEffect, useState } from 'react';
import './HistoryWidget.css';
import { useMonitoringApi } from '../../services/EvaluationService';
import HistoryItem from '../HistoryItem/HistoryItem';

interface HistoryWidgetProps {
    monitoring_id: string;
}

function HistoryWidget(props: HistoryWidgetProps) {
    const { getHistoryEvaluations } = useMonitoringApi();

    const [evaluations, setEvaluations] = useState([]);
    
    useEffect(() => {
        const fetchHistory = async () => {
            const data = await getHistoryEvaluations(props.monitoring_id);
            setEvaluations(data);
        }

        fetchHistory();
    }, [props.monitoring_id]);


    return (
        <div className='history'>
            <h2 className='history-title'><strong>Evaluation History</strong></h2>
            <div className='history-list-wrapper'>
                <ul className='history-list' tabIndex={0} aria-label='List of past webpage evaluations'>
                    {evaluations && evaluations.map((evaluation) =>
                        <HistoryItem 
                            key={evaluation['id']}
                            evaluation_id={evaluation['id']} 
                            evaluation_title={evaluation['title']} 
                            evaluation_url={evaluation['input_url']} 
                            evaluation_score={Math.floor(evaluation['score'] * 100)} 
                            evaluation_day={evaluation['date']['day']} 
                            evaluation_month={evaluation['date']['month']} 
                            evaluation_year={evaluation['date']['year']}
                            evaluation_hour={evaluation['date']['hour']}
                            evaluation_minute={evaluation['date']['minute']}
                            evaluation_second={evaluation['date']['second']}
                        />
                    )}
                </ul>
            </div>
        </div>
    );
}

export default HistoryWidget;