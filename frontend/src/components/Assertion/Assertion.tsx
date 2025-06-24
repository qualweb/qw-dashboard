import './Assertion.css';
import { useEffect, useRef, useState } from 'react';
import { CheckIcon, ChevronDown } from 'lucide-react';
import Result from '../Result/Result.tsx';
import { useMonitoringApi } from '../../services/EvaluationService.tsx';
import { Checkbox } from '@ark-ui/react/checkbox';

interface AssertionProps {
    id: string;
    name: string;
    rule: string;
    icon: JSX.Element;
    className: string;
    evaluation_id: string;
    webpage_url: string;
    webpage_screenshot: string;
    assertion_outcome: string;
}

function Assertion(props: AssertionProps) {
    const { getAssertionResults } = useMonitoringApi();

    const [expanded, setExpanded] = useState(false);
    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState<string[]>([]);

    const states = ["passed", "warning", "failed"];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInnerButtonClick = (event: any) => {
        event.stopPropagation();
    };

    useEffect(() => {
        const fetchAssertion = async () => {
            const data = await getAssertionResults(props.id);
            setResults(data);
        }
        fetchAssertion();
    }, [props.id]);

    const hiddenInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e : any) => {
        e.preventDefault();
    };

    return (
        <button className="tests-item" key={props.id} onClick={(event) => {          
            setExpanded(!expanded)          
            handleInnerButtonClick(event)       
        }}>
            <div className="tests-header">
                <div className='wrapper-4'>
                    <div className="tests-left">
                        <div className={props.className}>
                            {props.icon}
                        </div>
                        <div className="tests-title">
                            <h3>{props.name}</h3>
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
                    </div>
                    <div className="tests-right">
                        <strong><span>{props.rule}</span></strong>
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
                {expanded && (
                    <div className='expanded-results'>
                        {results && results.map((result) => (
                            filters.length === 0 ? (
                                <Result
                                    key={result["id"]}
                                    id={String(result["id"])}
                                    description={result["description"]}
                                    evaluation_id={props.evaluation_id}
                                    webpage_url={props.webpage_url}
                                    webpage_screenshot={props.webpage_screenshot}
                                    verdict={result["verdict"]}
                                />
                            ) :
                            filters.includes(result["verdict"]) ? (
                                <Result
                                    key={result["id"]}
                                    id={String(result["id"])}
                                    description={result["description"]}
                                    evaluation_id={props.evaluation_id}
                                    webpage_url={props.webpage_url}
                                    webpage_screenshot={props.webpage_screenshot}
                                    verdict={result["verdict"]}
                                />
                            ) : null
                        ))}
                    </div>
                )}
            </div>
        </button>
    );
};

export default Assertion;