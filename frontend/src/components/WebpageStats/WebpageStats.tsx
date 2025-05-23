import { ChevronUp, GlobeIcon } from 'lucide-react';
import './WebpageStats.css'
import { useState } from 'react';
import CompareWebpageStats from '../CompareWebpageStats/CompareWebpageStats';

interface WebpageStatsProps {
    webpage_id: string;
    webpage_url: string;
    first_cycle: string;
    second_cycle: string;
}

function WebpageStats(props: WebpageStatsProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <button className="webpage-item" key={props.webpage_id} onClick={() => setExpanded(!expanded)} style={{
            borderColor: expanded ? '#ffffff' : '',
        }}>
            <div className='webpage-item-header'>
                <div className='webpage-icon-url'>
                    <GlobeIcon />
                    <h3>{props.webpage_url}</h3>
                </div>
                <div className='see-comparison'>
                    <strong><span>See Comparison</span></strong>
                    <ChevronUp style={{
                        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                    }}/>
                </div>
            </div>
            {expanded && (
                <CompareWebpageStats
                    webpage_id={props.webpage_id}
                    first_cycle={props.first_cycle}
                    second_cycle={props.second_cycle}
                />
            )}
        </button>
    );
}

export default WebpageStats;