import LogoutButton from '../LogoutButton/LogoutButton';
import WebsiteCard from '../WebsiteCard /WebsiteCard';
import { useAuth0 } from "@auth0/auth0-react";
import './WebsitesOverview.css'
import { useEffect, useState } from 'react';
import { getUser, registerUser } from '../../services/UserService';
import { getUserWebsites } from '../../services/EvaluationService';
import AddMonitoringRegistryButton from '../AddMonitoringRegistryButton/AddMonitoringRegistryButton';

function WebsitesOverview() {
    const { user, isAuthenticated } = useAuth0();

    const [websites, setWebsites] = useState([]);
    const [user_id, setUser_id] = useState(-1);

    const fetchWebsites = async (user_id: number) => {
        if (user_id > -1) {
            const websitesData = await getUserWebsites(String(user_id));
            setWebsites(websitesData['monitoring_registries']);
        }
    };

    const handleWebsiteAdded = () => {
        fetchWebsites(user_id);
    };

    useEffect(() => {
        const checkRegister = async () => {

            const data = await getUser(user?.sub)

            if (data !== undefined && !data.exists) {
                const data = await registerUser(
                    user?.sub,
                    user?.nickname,
                    user?.picture,
                    user?.email
                );
                
                setUser_id(data['user_id']);
            }
            else if (data !== undefined && data.exists) {
                setUser_id(data['user_id']);
            }

            if (user_id > -1) {
                const websites = await getUserWebsites(String(user_id));

                setWebsites(websites);
            }
        }

        checkRegister();
    }, [user, user_id]);

    
    return (
        isAuthenticated && (
            <div className='websites-overview'>
                <div className='websites-overview-wrapper'>
                    <div className='websites-overview-header'>
                        <h1>
                            <span className="qualweb">Qualweb</span>
                            <div>
                                <span className="monitoring">Monitoring</span>
                            </div>
                        </h1>
                        <LogoutButton />
                    </div>
                    <div className='welcome'><h1>Welcome&nbsp;</h1><h1 className='username'>{user?.nickname} 👋</h1></div>
                    <div className='your-websites'>
                        <div className='your-websites-header'>
                            <h2>Your Websites</h2>
                            <AddMonitoringRegistryButton 
                                user_id={user_id}
                                onWebsiteAdded={handleWebsiteAdded}
                            />
                        </div>
                        <ul className='your-websites-list'>
                        {websites && websites.length > 0 ? 
                            websites.map((website) => (
                                <WebsiteCard 
                                    key={website['id']}
                                    id={website['id']}
                                    name={website['name']}
                                    url={website['main_url']}
                                    is_mobile={website['is_mobile']}
                                    is_landscape={website['is_landscape']}
                                    display_width={website['display_width']}
                                    display_height={website['display_height']}
                                    webpages={website['webpages']}
                                    latest_eval_day={website['latest_evaluation']['day']}
                                    latest_eval_month={website['latest_evaluation']['month']}
                                    latest_eval_year={website['latest_evaluation']['year']}
                                    score={website['score']}
                                    passed={website['passed']}
                                    warnings={website['warnings']}
                                    failed={website['failed']}
                                    inapplicable={website['inapplicable']}
                                />
                            ))
                            : 
                            <li>No websites found</li>
                        }
                        </ul>
                    </div>
                </div>
            </div>
        )
    );
}

export default WebsitesOverview;