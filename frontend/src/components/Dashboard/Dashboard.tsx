import MonitoringContent from '../MonitoringContent/MonitoringContent';
import DashboardMenu from '../DashboardMenu/DashboardMenu';
import './Dashboard.css';
import { useParams } from 'react-router-dom';

function Dashboard() {
  const { monitoring_id } = useParams();

  return (
    <div className='website-dashboard'>
      {monitoring_id ? (
        <>
          <DashboardMenu monitoring_id={monitoring_id} />
          <div className='wrapper'>
              <MonitoringContent monitoring_id={monitoring_id} />
          </div>
        </>) :
        <div>It was not possible to load content</div>
      }
    </div>
  );
}

export default Dashboard;