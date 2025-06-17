import { useEffect, useState } from 'react';
import { getWebsiteFavicon } from '../../services/EvaluationService';
import './WebsiteCard.css'
import { Link } from 'react-router-dom';

interface WebsiteCardProps {
    id : number;
    name : string;
    url : string;
    is_mobile : boolean;
    is_landscape : boolean;
    display_width : number;
    display_height : number;
    webpages : string[];
    latest_eval_day : number;
    latest_eval_month : number;
    latest_eval_year : number;
    score : number;
    passed : number;
    warnings : number;
    failed : number;
    inapplicable : number;
}
    
function WebsiteCard(props: WebsiteCardProps) {
    const [favicon, setFavicon] = useState('');

    useEffect(() => {
        const getFavicon = async () => {
            console.log(props.url);
            const favicon = await getWebsiteFavicon(props.url);
            setFavicon(favicon);
        };

        getFavicon();
    })

    return (
        <li className='website-card-wrapper'>
            <Link className='website-card' to={`/dashboard/${props.id}`}>
                <div className='website-card-above' >
                    <div className='website-info'>
                        <img src={favicon} alt="" />
                        <div className='website-name-url'>
                            <span><strong>{props.name}</strong></span>
                            <span className='website-card-url'><strong>{props.url}</strong></span>
                        </div>
                    </div>
                    <div className='website-last-eval-score'>
                        <div className='website-card-last-eval'>
                            <span className='website-card-last-eval-text'><strong>Latest Evaluation</strong></span>
                            <span className='website-card-last-eval-date'><strong>{props.latest_eval_day}/{props.latest_eval_month}/{props.latest_eval_year}</strong></span>
                        </div>
                        <div className='website-score'>
                            <span><strong>{Math.floor(props.score * 100)}</strong></span>
                        </div>
                    </div>
                </div>
                <div className='website-card-under'>
                    <ul className='website-stats'>
                        <li>
                            <span><strong>Passed</strong></span>
                            <span><strong>{props.passed}</strong></span>
                        </li>
                        <li>
                            <span><strong>Warnings</strong></span>
                            <span><strong>{props.warnings}</strong></span>
                        </li>
                        <li>
                            <span><strong>Failed</strong></span>
                            <span><strong>{props.failed}</strong></span>
                        </li>
                        <li>
                            <span><strong>Inapplicable</strong></span>
                            <span><strong>{props.inapplicable}</strong></span>
                        </li>
                    </ul>
                    <div className='website-card-webpages'>
                        <span><strong>Webpages</strong></span>
                        <span><strong>{props.webpages.length}</strong></span>
                    </div>
                </div>
            </Link>
        </li>
    );
}

export default WebsiteCard;