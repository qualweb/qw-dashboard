import { Link } from 'react-router-dom';
import './WebsiteDashboardMenuItem.css';

interface WebsiteDashboardMenuItemProps {
    name: string;
    path: string;
    icon: React.ReactNode;
}

function WebsiteDashboardMenuItem(props: WebsiteDashboardMenuItemProps) {
    return (
        <Link to={props.path}>
            {props.icon}
            <strong>{props.name}</strong>
        </Link>
    );
}

export default WebsiteDashboardMenuItem;