import './HistoryItem.css'

interface HistoryItemProps {
    evaluation_id: string;
    evaluation_title: string;
    evaluation_url: string;
    evaluation_score: number;
    evaluation_day: number;
    evaluation_month: number;
    evaluation_year: number;
    evaluation_hour: number;
    evaluation_minute: number;
    evaluation_second: number;
}

function HistoryItem(props: HistoryItemProps) {
    let score_color = 'rgba(17, 249, 52, 0.186)';
    if (props.evaluation_score < 50) {
        score_color = 'rgba(255, 0, 0, 0.186)';
    } else if (props.evaluation_score >= 50 && props.evaluation_score < 75) {
        score_color = 'rgba(255, 221, 0, 0.186)';
    }

    // Helper function to add leading zero if number is less than 10
    const padZero = (num: number): string => {
        return num < 10 ? `0${num}` : `${num}`;
    };

    return (
        <li className='history-item' tabIndex={0}>
            <div className='webpage-title-url'>
                <h3>{props.evaluation_title}</h3>
                <h4>{props.evaluation_url}</h4>
            </div>
            <div className='webpage-score-date'>
                <div className='webpage-score' aria-label={'Score: ' + props.evaluation_score + '%'} style={{
                    backgroundColor: score_color
                }}><strong>{props.evaluation_score}</strong></div>
                <div className='evaluation-date'>
                    <span><strong>{padZero(props.evaluation_day)}/{padZero(props.evaluation_month)}/{props.evaluation_year}</strong></span>
                    <span><strong>{padZero(props.evaluation_hour)}:{padZero(props.evaluation_minute)}:{padZero(props.evaluation_second)}</strong></span>
                </div>
            </div>
        </li>
    );
}

export default HistoryItem;