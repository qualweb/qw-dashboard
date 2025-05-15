import { useAuth0 } from '@auth0/auth0-react';
import { DashboardIcon, ScaleIcon, SignOutIcon, TimeIcon, UserIcon, WarningIcon, Chart } from '../../assets/Icons';
import WebsiteDashboardMenuItem from '../DashboardMenuItem/DashboardMenuItem';
import './DashboardMenu.css';

import { Menu } from '@ark-ui/react/menu'
import { useState } from 'react';

import { MenuIcon } from '../../assets/Icons';
import { X } from 'lucide-react';

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
    /*
    const [monitoredWebsites, setMonitoredWebsites] = useState([]);

    useEffect(() => {
        const fetchMonitoredWebsites = async () => {
            const data = await getMonitoredWebsites();
            setMonitoredWebsites(data);
        }

        fetchMonitoredWebsites();
    }, [props.monitoring_id]);

    
    const items = createWebpagesCollection(monitoredWebsites);

    const collection = createListCollection({
        items: items,
    });
    */

    const { user, logout } = useAuth0();
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className='sidebar-container'>
            {!isOpen && (
                <button className='menu-button' onClick={toggleMenu}>
                    {MenuIcon}
                </button>
            )}
            {isOpen && (
                <button className='close-menu-button' onClick={toggleMenu}>
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
                            { /*<li>
                                <Select.Root collection={collection}>
                                    <Select.Label className='select-website-label'>
                                        <strong>Current website</strong>
                                    </Select.Label>
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText placeholder="Select a website" />
                                            <Select.Indicator>
                                                <ChevronDownIcon />
                                            </Select.Indicator>
                                        </Select.Trigger>
                                    </Select.Control>
                                    <Portal>
                                        <Select.Positioner>
                                            <Select.Content>
                                                <Select.ItemGroup>
                                                    {collection.items.map((item) => (
                                                        <Select.Item key={item.value} item={item}>
                                                            <Select.ItemText>{item.label}</Select.ItemText>
                                                        </Select.Item>
                                                    ))}
                                                </Select.ItemGroup>
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                    <Select.HiddenSelect />
                                </Select.Root>
                            </li> */}
                            <li>
                                <div className='list-item'>
                                    <WebsiteDashboardMenuItem name="Websites overview" path={`/websites-overview`}  icon={DashboardIcon} />
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
                                    <WebsiteDashboardMenuItem name="Evaluation scheduler" path="/scheduler" icon={TimeIcon} />
                                </div>
                            </li>
                            <li>
                                <div className='list-item'>
                                    <WebsiteDashboardMenuItem name="Compare Evaluations" path={`/dashboard/${props.monitoring_id}/compare-evaluations`} icon={ScaleIcon} />
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