/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import './WebpagesList.css'
import { useMonitoringApi } from '../../services/EvaluationService';
import WebpageStats from '../WebpageStats/WebpageStats';

interface WebpagesListProps {
    monitoring_id: string;
    first_cycle: string;
    second_cycle: string;
}

function WebpagesList(props: WebpagesListProps) {
    const { getMonitoredWebpages } = useMonitoringApi();

    const [webpages, setWebpages] = useState([]);

    useEffect(() => {
        const fetchWebpages = async () => {
            const data = await getMonitoredWebpages(props.monitoring_id);
            setWebpages(data);
        };
        fetchWebpages();
    }
    , [props.monitoring_id]);

    return (
        <div className="webpages-list">
            {webpages.map((webpage) => (
                <WebpageStats 
                    key={webpage['id']}
                    webpage_id={webpage['id']}
                    webpage_url={webpage['url']}
                    first_cycle={props.first_cycle}
                    second_cycle={props.second_cycle}
                />
            ))}
        </div>
    );
}

export default WebpagesList;