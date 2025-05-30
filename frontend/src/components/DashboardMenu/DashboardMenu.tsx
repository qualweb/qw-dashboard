import { useAuth0 } from '@auth0/auth0-react';
import { DashboardIcon, ScaleIcon, SignOutIcon, TimeIcon, UserIcon, WarningIcon, Chart, ListIcon } from '../../assets/Icons';
import WebsiteDashboardMenuItem from '../DashboardMenuItem/DashboardMenuItem';
import './DashboardMenu.css';

import { Menu } from '@ark-ui/react/menu'
import { useState } from 'react';

import { MenuIcon } from '../../assets/Icons';

/*
import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useState } from 'react';
import { getMonitoredWebsites } from '../../services/EvaluationService';
*/

interface DashboardMenuProps {
    monitoring_id : string;
}

function DashboardMenu (props: DashboardMenuProps) {
    const { user, logout } = useAuth0();
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className='sidebar-container'>
            {!isOpen && (
                <button className='menu-button' aria-label={isOpen ? "Close menu" : "Open menu"} onClick={toggleMenu}>
                    {MenuIcon}
                </button>
            )}
            {isOpen && (
                <button className='close-menu-button' aria-label={isOpen ? "Close menu" : "Open menu"} onClick={toggleMenu}>
                    {MenuIcon}
                </button>
            )}
            {isOpen && (
                <div className='sidebar'>
                    <h1>
                        <span className="qualweb">Qualweb</span>
                        <div>
                            <span className="monitoring">Monitoring</span>
                        </div>
                    </h1>
                    <nav className='sidebar-menu'>
                        <ul>
                            <li>
                                <div className='list-item'>
                                    <WebsiteDashboardMenuItem name="Websites overview" path={`/websites-overview`}  icon={ListIcon} />
                                </div>
                            </li>
                            <li>
                                <div className='list-item'>
                                    <WebsiteDashboardMenuItem name="Dashboard" path={`/dashboard/${props.monitoring_id}`} icon={DashboardIcon} />
                                </div>
                            </li>
                            <li>
                                <div className='list-item'>
                                    <WebsiteDashboardMenuItem name="Current warnings" path={`/dashboard/${props.monitoring_id}/current-warnings`}  icon={WarningIcon} />
                                </div>
                            </li>
                            <li>
                                <div className='list-item'>
                                    <WebsiteDashboardMenuItem name="Evaluate" path={`/dashboard/${props.monitoring_id}/evaluate`}  icon={Chart} />
                                </div>
                            </li>
                            <li>
                                <div className='list-item'>
                                    <WebsiteDashboardMenuItem name="Evaluation scheduler" path={`/dashboard/${props.monitoring_id}/scheduler`} icon={TimeIcon} />
                                </div>
                            </li>
                            <li>
                                <div className='list-item'>
                                    <WebsiteDashboardMenuItem name="Compare Evaluations" path={`/dashboard/${props.monitoring_id}/select-evaluations`} icon={ScaleIcon} />
                                </div>
                            </li>
                            <li>
                                <div className='list-item'>
                                    <Menu.Root>
                                        <Menu.Trigger>
                                            {UserIcon}
                                            {user?.name}
                                        </Menu.Trigger>
                                        <Menu.Positioner>
                                            <Menu.Content>
                                                <Menu.Item value="signout" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>{SignOutIcon}Sign out</Menu.Item>
                                            </Menu.Content>
                                        </Menu.Positioner>
                                    </Menu.Root>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <div className='qualweb-logo'>
                        <img src="/src/assets/qualweb_logo.png" alt="Qualweb evaluator logo" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardMenu;

/*
function createWebpagesCollection(list : string[]) {
    const items : { label: string, value: string }[] = []

    list.forEach(element => {
        items.push({ label: element, value: element });
    });

    return items;
}
*/