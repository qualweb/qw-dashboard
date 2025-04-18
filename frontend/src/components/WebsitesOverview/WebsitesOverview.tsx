import LogoutButton from '../LogoutButton/LogoutButton';
import WebsiteCard from '../WebsiteCard /WebsiteCard';
import { useAuth0 } from "@auth0/auth0-react";
import './WebsitesOverview.css'
import { useEffect, useState } from 'react';
import { getUser, registerUser } from '../../services/UserService';
import { getUserWebsites } from '../../services/EvaluationService';

function WebsitesOverview() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    const [websites, setWebsites] = useState();

    useEffect(() => {
        const checkRegister = async () => {
            let user_id = -1;

            const data = await getUser(user?.sub)

            if (data !== undefined && !data.exists) {
                const data = await registerUser(
                    user?.sub,
                    user?.nickname,
                    user?.picture,
                    user?.email
                );
                
                user_id = data['user_id'];
            }
            else if (data !== undefined && data.exists) {
                user_id = data['user_id'];
            }

            if (user_id > -1) {
                const websites = await getUserWebsites(String(user_id));

                setWebsites(websites);
            }
        }

        checkRegister();
    }, [user?.sub, user?.nickname, user?.picture, user?.email]);
    
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
                            <button className='add-website-button'><strong>+ New Website</strong></button>
                        </div>
                        <ul className='your-websites-list'>
                            <WebsiteCard />
                            <WebsiteCard />
                            <WebsiteCard />
                        </ul>
                    </div>
                </div>
            </div>
        )
    );
}

export default WebsitesOverview;