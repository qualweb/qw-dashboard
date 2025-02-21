import MonitoringContent from '../MonitoringContent/MonitoringContent';
import WebsiteDashboardMenu from '../WebsiteDashboardMenu/WebsiteDashboardMenu';
import './WebsiteDashboard.css';

function WebsiteDashboard() {
    return (
      <div className='website-dashboard'>
        <WebsiteDashboardMenu />
        <div className='wrapper'>
          <MonitoringContent />
        </div>
      </div>
    );
}

export default WebsiteDashboard;