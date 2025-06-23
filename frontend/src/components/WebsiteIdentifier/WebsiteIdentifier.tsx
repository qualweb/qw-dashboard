import { useEffect, useState } from 'react';
import './WebsiteIdentifier.css'
import { useMonitoringApi, getWebsiteFavicon } from '../../services/EvaluationService';

interface WebsiteIdentifierProps {
    monitoring_id: string;
}

function WebsiteIdentifier(props: WebsiteIdentifierProps) {
    const { getMonitoringRegistry } = useMonitoringApi();

    const [favicon, setFavicon] = useState("");
    const [website, setWebsite] = useState();

    useEffect(() => {
        const fetchWebsite = async () => {
            const data = await getMonitoringRegistry(props.monitoring_id);
            setWebsite(data);
        }

        fetchWebsite();
    }, [props.monitoring_id]);

    useEffect(() => {
        const fetchWebsiteFavicon = async (url: string) => {
            const data = await getWebsiteFavicon(url);
            setFavicon(data);
        }

        if (website && website['main_url']) {
            fetchWebsiteFavicon(website['main_url']);
        }
    }, [website]);

    return (
        <div className="website-identifier">
            {website && (
                <div className="website-identifier-container">
                    {favicon && (<img src={favicon} alt="" />)}
                    <h3>{website['main_url']}</h3>
                </div>
            )}
        </div>
    );
}

export default WebsiteIdentifier;