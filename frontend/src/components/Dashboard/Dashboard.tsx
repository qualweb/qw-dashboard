import MonitoringContent from '../MonitoringContent/MonitoringContent';
import DashboardMenu from '../DashboardMenu/DashboardMenu';
import './Dashboard.css';
import { useParams } from 'react-router-dom';
import { getEvaluationsData } from '../../services/EvaluationService';
import { useEffect, useState } from 'react';

function Dashboard() {
  const { monitoring_id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (monitoring_id) {
        const data = await getEvaluationsData(monitoring_id);
        setData(data);
        setLoading(false);
      }
    }
    fetchData();
  }, [monitoring_id]);

  if (loading) return <div>Loading dashboard data...</div>;

  return (
    <div className='website-dashboard'>
      { data && <>
        <DashboardMenu webpages={data['webpages']} />
        <div className='wrapper'>
          {monitoring_id ? (
            <MonitoringContent 
              monitoring_id={monitoring_id}
              accessibility_metric={data['accessibility_metric']}
              main_url={data['main_url']}
              domain_name={data['domain_name']}
              is_mobile={data['is_mobile']}
              is_landscape={data['is_landscape']}
              display_width={data['display_width']}
              display_height={data['display_height']}
              webpages={data['monitored_pages']}
              latest_evaluation={data['latest_evaluation']}
              accessibility_score={data['accessibility_score']}
            />) : 
            <div>It was not possible to load content</div>
          }
        </div>
      </>}
    </div>
  );
}

export default Dashboard;