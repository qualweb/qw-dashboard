import { HistoryIcon, ManualIcon, SignOutIcon, TimeIcon, UserIcon, WarningIcon } from '../../assets/Icons';
import WebsiteDashboardMenuItem from '../DashboardMenuItem/DashboardMenuItem';
import './DashboardMenu.css';

import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronDownIcon } from 'lucide-react'
import { Menu } from '@ark-ui/react/menu'
import { useEffect, useState } from 'react';
import { getMonitoredWebsites } from '../../services/EvaluationService';

interface DashboardMenuProps {
    monitoring_id : string;
}

function DashboardMenu (props: DashboardMenuProps) {
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
    
    const current_username = "Tomás"

    return (
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
                        <Select.Root collection={collection}>
                            <Select.Label>
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
                    </li>
                    <li>
                        <WebsiteDashboardMenuItem name="Current warnings" path="/dashboard/:monitoring_id/current-warnings" icon={WarningIcon} />
                    </li>
                    <li>
                        <WebsiteDashboardMenuItem name="Evaluation scheduler" path="/scheduler" icon={TimeIcon} />
                    </li>
                    <li>
                        <WebsiteDashboardMenuItem name="Manual evaluation" path="/manual" icon={ManualIcon} />
                    </li>
                    <li>
                        <WebsiteDashboardMenuItem name="Evaluation history" path="/history" icon={HistoryIcon} />
                    </li>
                    <li>
                        <Menu.Root>
                            <Menu.Trigger>
                                {UserIcon}
                                {current_username}
                            </Menu.Trigger>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value="signout">{SignOutIcon}Sign out</Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Menu.Root>
                    </li>
                </ul>
            </nav>
            <div className='qualweb-logo'>
                <img src="/src/assets/qualweb_logo.png" alt="Qualweb evaluator logo" />
            </div>
        </div>
    );
}

export default DashboardMenu;

function createWebpagesCollection(list : string[]) {
    const items : { label: string, value: string }[] = []

    list.forEach(element => {
        items.push({ label: element, value: element });
    });

    return items;
}