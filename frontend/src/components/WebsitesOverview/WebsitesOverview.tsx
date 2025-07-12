import LogoutButton from '../LogoutButton/LogoutButton';
import WebsiteCard from '../WebsiteCard/WebsiteCard';
import { useAuth0 } from "@auth0/auth0-react";
import './WebsitesOverview.css'
import { useEffect, useState } from 'react';
import { useUserApi } from '../../services/UserService';
import { useMonitoringApi } from '../../services/EvaluationService';
import AddMonitoringRegistryButton from '../AddMonitoringRegistryButton/AddMonitoringRegistryButton';
import { Progress } from '@ark-ui/react/progress';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/qualweb_monitoring_logo.png';

function WebsitesOverview() {
    const navigate = useNavigate();
    const { getUserWebsites } = useMonitoringApi();
    const { registerUser, getUser } = useUserApi();
    const [websites, setWebsites] = useState([]);
    const [user_id, setUser_id] = useState(-1);
    const [refresh, setRefresh] = useState(0);
    const [loadingWebsites, setLoadingWebsites] = useState(new Map());
    const { user, isAuthenticated, isLoading } = useAuth0();
    
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
          navigate('/');
        }
    }, [isLoading, isAuthenticated]);

    const refreshTrigger = () => {
        setRefresh(prev => prev + 1);
    }
    
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
                try {
                    const websites = await getUserWebsites(String(user_id));
                    setWebsites(websites);
                } catch (error) {
                    console.error('Error fetching websites:', error);
                }
            }
        }

        checkRegister();
    }, [user, user_id, refresh]);

    useEffect(() => {
        loadingWebsites.forEach((id, [progress, ]) => {
            if (progress === 100) {
                loadingWebsites.delete(id);
            }
        })
    }, [loadingWebsites]);
    
    return (
        isAuthenticated && (
            <div className='websites-overview'>
                <div className='websites-overview-wrapper'>
                    <div className='websites-overview-header'>
                        <div className="qwdashboard-logo" tabIndex={1}>
                            <img src={logo} alt="Qualweb Dashboard logo" />
                        </div>
                        <LogoutButton />
                    </div>
                    <main>
                        <div className='welcome'>
                            <h1>Welcome&nbsp;<span className='username'>{user?.name} 👋</span></h1>
                        </div>
                        <div className='your-websites'>
                            <div className='your-websites-header'>
                                <h2>Your Websites</h2>
                                { user_id > -1 && (
                                    <AddMonitoringRegistryButton 
                                        user_id={user_id}
                                        onAdd={setLoadingWebsites}
                                        refreshTrigger={refreshTrigger}
                                    />
                                )}
                            </div>
                            <nav aria-label="Your websites">
                                <ul className='your-websites-list'>
                                    {websites && websites.length > 0 ? (
                                        <>
                                            {loadingWebsites.size > 0 && 
                                                Array.from(loadingWebsites.entries()).map(([id, [progress, webpage_url]]) => (
                                                    <li className="website-loading-card" key={`loading-${id}`}>
                                                        <Progress.Root value={progress} className='progress-loading'>
                                                            <div className="label">
                                                                <span><strong>Evaluating website {webpage_url}: </strong></span>
                                                                <Progress.ValueText />
                                                            </div>
                                                            <Progress.Track className='track-loading'>
                                                                <Progress.Range className='range-loading' />
                                                            </Progress.Track>
                                                        </Progress.Root>
                                                    </li>
                                                ))
                                            }
                                            {websites.map((website) => (
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
                                            ))}
                                        </>
                                    ) : (
                                        <li>No websites found.</li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </main>
                </div>
            </div>
        )
    );
}

export default WebsitesOverview;