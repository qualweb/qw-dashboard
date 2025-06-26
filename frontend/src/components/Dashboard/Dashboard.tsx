import MonitoringContent from '../MonitoringContent/MonitoringContent';
import DashboardMenu from '../DashboardMenu/DashboardMenu';
import './Dashboard.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Dashboard() {
  const { monitoring_id } = useParams();

  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
    
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isLoading, isAuthenticated]);

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