import IssuesListWidget from '../IssuesListWidget/IssuesListWidget';
import ProgressWidget from '../ProgressWidget/ProgressWidget';
import ScoreWidget from '../ScoreWidget/ScoreWidget';
import './MonitoringContent.css';

function MonitoringContent() {
    return (
        <main className='main-content'>
            <ScoreWidget />
            <ProgressWidget />
            <IssuesListWidget />
        </main>
    );
}

export default MonitoringContent;