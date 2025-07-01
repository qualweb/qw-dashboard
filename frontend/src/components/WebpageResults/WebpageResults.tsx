import { useEffect, useRef, useState } from 'react';
import './WebpageResults.css'
import { CheckIcon, ChevronDown, Globe } from 'lucide-react';
import { Checkbox } from '@ark-ui/react/checkbox';
import { useMonitoringApi } from '../../services/EvaluationService';
import Result from '../Result/Result';

interface WebpageResultsProps {
    assertion_id: string;
    webpage_url: string;
    assertion_outcome: string;
    eval_id: string;
}

function WebpageResults(props: WebpageResultsProps) {
    const { getAssertionResults, getWebpageScreenshot } = useMonitoringApi();

    const [expanded, setExpanded] = useState(false);
    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState<string[]>([]);

    const [webpageScreenshot, setWebpageScreenshot] = useState('');

    const states = ["passed", "warning", "failed"];

    useEffect(() => {
        const fetchWebpageScreenshot = async () => {
            const data = await getWebpageScreenshot(props.eval_id);
            setWebpageScreenshot(data);
        }
        fetchWebpageScreenshot();
    }, [props.eval_id]);
    
    useEffect(() => {
        const fetchAssertion = async () => {
            const data = await getAssertionResults(props.assertion_id);
            setResults(data);
        }
        fetchAssertion();
    }, [props.assertion_id]);

    const hiddenInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInnerButtonClick = (event: any) => {
        event.stopPropagation();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e : any) => {
        e.preventDefault();
    };

    return (
        <div className="webpage-results">
            <button className="webpage-results-item" onClick={(event) => {          
                setExpanded(!expanded)          
                handleInnerButtonClick(event)       
            }} >
                <div className='issue-main-info-wrapper'>
                    <div className="issue-left">
                        <div className="globe-icon">
                            <Globe size={24} />
                        </div>
                        <h3 className="issue-url">{props.webpage_url}</h3>
                    </div>
                    { expanded && props.assertion_outcome !== "inapplicable" && (
                        <Checkbox.Group
                            onValueChange={(details) => {
                                const selectedValues = Array.from(details.values());
                                
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const newFilters : any[] = [];
                                
                                selectedValues.forEach(value => {
                                    const item = states.find(item => item === value);
                                    if (item) {
                                        newFilters.push(item);
                                    }
                                });

                                setFilters(newFilters);
                            }}
                        >
                            {states.map((state) => (
                                <Checkbox.Root 
                                    value={state} 
                                    key={state} 
                                    checked={filters.includes(state)}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === ' ') {
                                            e.preventDefault();
                                            
                                            hiddenInputRefs.current[state]?.click();
                                        }
                                    }}
                                    aria-label={state}
                                    role='checkbox'
                                    aria-checked={filters.some(item => item === state)}
                                >
                                    <Checkbox.Control
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleChange(event);
                                            hiddenInputRefs.current[state]?.click(); 
                                        }}
                                    >
                                        <Checkbox.Indicator>
                                            <CheckIcon />
                                        </Checkbox.Indicator>
                                    </Checkbox.Control>
                                    <Checkbox.Label>{state.charAt(0).toUpperCase() + state.slice(1)}</Checkbox.Label>
                                    <Checkbox.HiddenInput
                                        ref={(el) => {
                                            hiddenInputRefs.current[state] = el;
                                        }}
                                        tabIndex={-1}
                                        onClick={() => {
                                            console.log('Checkbox clicked:', state);
                                        }}
                                    />
                                </Checkbox.Root>
                            ))}
                        </Checkbox.Group>
                    )}
                    <div className="webpage-results-right">
                        <strong><span>More info</span></strong>
                        { props.assertion_outcome !== "inapplicable" && (
                            <ChevronDown 
                                size={20} 
                                style={{
                                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease'
                                }} 
                            />
                        )}
                    </div>
                </div>
                {expanded &&
                    <div className='expanded-results'>
                        {results && results.map((result) => (
                            filters.length === 0 ? (
                                <Result
                                    key={result["id"]}
                                    id={String(result["id"])}
                                    description={result["description"]}
                                    webpage_url={props.webpage_url}
                                    webpage_screenshot={webpageScreenshot}
                                    verdict={result["verdict"]}
                                    elements={result["elements"] || []}
                                />
                            ) :
                            filters.includes(result["verdict"]) ? (
                                <Result
                                    key={result["id"]}
                                    id={String(result["id"])}
                                    description={result["description"]}
                                    webpage_url={props.webpage_url}
                                    webpage_screenshot={webpageScreenshot}
                                    verdict={result["verdict"]}
                                    elements={result["elements"] || []}
                                />
                            ) : null
                        ))}
                    </div>
                }
            </button>
        </div>
    );
}

export default WebpageResults;