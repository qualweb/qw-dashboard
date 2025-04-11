import { getTimeDiff } from '../utils/utils';
import './HistoryItem.css'

interface HistoryItemProps {
    evaluation_id: string;
    evaluation_title: string;
    evaluation_url: string;
    evaluation_score: number;
    evaluation_day: number;
    evaluation_month: number;
    evaluation_year: number;
}

function HistoryItem(props: HistoryItemProps) {
    let score_color = 'rgba(17, 249, 52, 0.186)';

    if (props.evaluation_score < 50) {
        score_color = 'rgba(255, 0, 0, 0.186)';
    } else if (props.evaluation_score >= 50 && props.evaluation_score < 75) {
        score_color = 'rgba(255, 221, 0, 0.186)';
    }

    const time_diff = getTimeDiff(props.evaluation_day, props.evaluation_month, props.evaluation_year);

    return (
        <li key={props.evaluation_id} className='history-item'>
            <div className='webpage-title-url'>
                <h3>{props.evaluation_title}</h3>
                <h4>{props.evaluation_url}</h4>
            </div>
            <div className='webpage-score-date'>
                <div className='webpage-score' style={{
                    backgroundColor: score_color
                }}><strong>{props.evaluation_score}</strong></div>
                <div className='evaluation-date'>
                    <strong>{time_diff}</strong>
                </div>
            </div>
        </li>
    );
}

export default HistoryItem;