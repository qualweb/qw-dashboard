import IssuesListWidget from '../IssuesListWidget/IssuesListWidget';
import ProgressWidget from '../ProgressWidget/ProgressWidget';
import ScoreWidget from '../ScoreWidget/ScoreWidget';
import './MonitoringContent.css';

interface MonitoringContentProps {
    monitoring_id: string;
    accessibility_metric: string;
    main_url: string;
    domain_name: string;
    is_mobile: boolean;
    is_landscape: boolean;
    display_width: number;
    display_height: number;
    webpages: string[];
    latest_evaluation: string;
    accessibility_score: number;
}

function MonitoringContent(props: MonitoringContentProps) {  
    return (
        <main className='main-content'>
            <ScoreWidget 
                accessibility_score={props.accessibility_score} 
            />
            <ProgressWidget />
            <IssuesListWidget 
                monitoring_id={props.monitoring_id} 
            />
        </main>
    );
}

export default MonitoringContent;