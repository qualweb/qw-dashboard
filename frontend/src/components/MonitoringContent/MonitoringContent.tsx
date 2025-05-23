import HistoryWidget from '../HistoryWidget/HistoryWidget';
import IssuesListWidget from '../IssuesListWidget/IssuesListWidget';
import ScoreWidget from '../ScoreWidget/ScoreWidget';
import WebsiteIdentifier from '../WebsiteIdentifier/WebsiteIdentifier';
import './MonitoringContent.css';

interface MonitoringContentProps {
    monitoring_id: string;
}

function MonitoringContent(props: MonitoringContentProps) {  
    return (
        <main className='main-content'>
            <WebsiteIdentifier monitoring_id={props.monitoring_id} />
            <div className='score-history-wrapper'>
                <ScoreWidget 
                    monitoring_id={props.monitoring_id} 
                />
                <HistoryWidget monitoring_id={props.monitoring_id} />
            </div>
            <IssuesListWidget 
                monitoring_id={props.monitoring_id} 
            />
        </main>
    );
}

export default MonitoringContent;