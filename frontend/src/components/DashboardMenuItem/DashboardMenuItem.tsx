import { Link } from 'react-router-dom';
import './DashboardMenuItem.css';

interface WebsiteDashboardMenuItemProps {
    name: string;
    path: string;
    icon: React.ReactNode;
}

function DashboardMenuItem(props: WebsiteDashboardMenuItemProps) {
    return (
        <Link to={props.path} className='list-item' role="menuitem" >
            {props.icon}
            <strong>{props.name}</strong>
        </Link>
    );
}

export default DashboardMenuItem;