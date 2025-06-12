import { useState } from 'react';
import './FailedTest.css'
import { ChevronDown, Globe } from 'lucide-react';

interface FailedTestProps {
    assertion_name: string;
    assertion_code: string;
    webpages: string[];
    diff: number;
    new_webpages: string[];
}

function FailedTest(props: FailedTestProps) {
    const [expanded, setExpanded] = useState(false);
    console.log(props);
    return (
        <li className='rule' key={props.assertion_name}>
            <button className='rule-button' onClick={() => setExpanded(!expanded)}>
                <div className='rule-wrapper'>
                    <div className="rule-code">
                        <h4>{props.assertion_name}</h4>
                        <span className='assertion-code' ><strong>{props.assertion_code}</strong></span>
                    </div>
                    <div className='rule-affected-webpages'>
                        <span><strong>{props.webpages.length} <sup>{props.diff == 0 ? '' : (props.diff > 0 ? '+' + props.diff : props.diff)}</sup> affected webpages</strong></span>
                        <div className='rule-affected-webpages-button'>
                            <ChevronDown
                                style={{ 
                                    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease' 
                                }}
                            />
                        </div>
                    </div>
                </div>
                {expanded && (
                    <div className='rule-webpages'>
                        <ul className='rule-webpages-list'>
                            {props.webpages.map((webpage, index) => (
                                <li key={index} className='failed-webpage'>
                                    <Globe />
                                    <span>{webpage}</span>
                                    {props.new_webpages.includes(webpage) && <span className='new-webpage'><strong>New</strong></span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </button>
        </li> 
    )
}

export default FailedTest;