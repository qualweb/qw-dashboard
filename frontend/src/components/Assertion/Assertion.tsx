import './Assertion.css';
import { useEffect, useState } from 'react';
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

    const toggleStatusFilter = (filter: string) => {
        setFilters(prev => 
            prev.includes(filter)
                ? prev.filter(item => item !== filter)
                : [...prev, filter]
        );
    };

    
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
                            <div className='assertion-state-filter'>
                                {states.map((state) => (
                                    <Checkbox.Root key={state} checked={filters.includes(state)}>
                                        <Checkbox.Control onClick={(event) => {
                                            handleInnerButtonClick(event)
                                            handleChange(event)
                                        }}>
                                            <Checkbox.Indicator>
                                                <CheckIcon />
                                            </Checkbox.Indicator>
                                        </Checkbox.Control>
                                        <Checkbox.Label>{state.charAt(0).toUpperCase() + state.slice(1)}</Checkbox.Label>
                                        <Checkbox.HiddenInput onClick={() => {toggleStatusFilter(state)}}  />
                                    </Checkbox.Root>
                                ))}
                            </div>
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