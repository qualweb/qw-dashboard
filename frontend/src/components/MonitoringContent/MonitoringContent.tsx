import IssuesListWidget from '../IssuesListWidget/IssuesListWidget';
import ProgressWidget from '../ProgressWidget/ProgressWidget';
import ScoreWidget from '../ScoreWidget/ScoreWidget';
import './MonitoringContent.css';

interface MonitoringContentProps {
    monitoring_id: string;
}

function MonitoringContent(props: MonitoringContentProps) {  
    return (
        <main className='main-content'>
            <ScoreWidget 
                monitoring_id={props.monitoring_id} 
            />
            <ProgressWidget />
            <IssuesListWidget 
                monitoring_id={props.monitoring_id} 
            />
        </main>
    );
}

export default MonitoringContent;