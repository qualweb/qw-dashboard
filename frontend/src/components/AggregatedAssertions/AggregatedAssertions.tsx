import { ChevronDown } from 'lucide-react';
import './AggregatedAssertions.css';
import { useState } from 'react';
import WebpageResults from '../WebpageResults/WebpageResults';

interface AggregatedAssertionsProps {
    rule: string;
    name: string;
    icon: JSX.Element;
    className: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    assertion_ids: any[];
    assertion_outcome: string;
}

function AggregatedAssertions(props: AggregatedAssertionsProps) {
    const [expanded, setExpanded] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInnerButtonClick = (event: any) => {
        event.stopPropagation();
    };

    return (
        <div className="aggregated-assertion">
            <button className="issue-item" onClick={(event) => {          
                setExpanded(!expanded)          
                handleInnerButtonClick(event)       
            }} >
                <div className='issue-main-info-wrapper'>
                    <div className="issue-left">
                        <div className={props.className}>
                            {props.icon}
                        </div>
                        <div className="tests-title">
                            <h3>{props.name}</h3>
                        </div>
                    </div>
                    <div
                        className="issue-right"
                    >
                        <strong><span>More info</span></strong>
                        <ChevronDown
                            size={20}
                            style={{
                                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease'
                        }}
                        />
                    </div>
                </div>
                {expanded &&
                <div className="expanded-content">
                    {expanded && (
                        <div className="expanded-tests-2">
                            {props.assertion_ids && props.assertion_ids.map((assertion) => (
                                <WebpageResults
                                    key={assertion['id']}
                                    assertion_id={assertion['id']}
                                    webpage_url={assertion['url']} 
                                    assertion_outcome={props.assertion_outcome}
                                    eval_id={assertion['eval_id']}
                                />
                            ))}
                        </div>
                    )}
                </div>
                }
            </button>
        </div>
    );
}

export default AggregatedAssertions;