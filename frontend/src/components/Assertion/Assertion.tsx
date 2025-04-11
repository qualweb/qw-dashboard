import './Assertion.css';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { GetAssertionResultsResponse } from '../Types/Types.ts';
import Result from '../Result/Result.tsx';
import { getAssertionResults } from '../../services/EvaluationService.tsx';

interface AssertionProps {
    id: string;
    name: string;
    rule: string;
    icon: JSX.Element;
    className: string;
    evaluation_id: string;
    webpage_url: string;
    webpage_screenshot: string;
}

function Assertion(props: AssertionProps) {
    const [expanded, setExpanded] = useState(false);
    const [results, setResults] = useState<GetAssertionResultsResponse>();
    
    useEffect(() => {
        const fetchAssertion = async () => {
            const data = await getAssertionResults(props.id);
            setResults(data);
        }
        fetchAssertion();
    }, [props.id]);

    return (
        <div className="tests-item" key={props.id}>
            <div className="tests-header">
                <div className='wrapper-4'>
                    <div className="tests-left">
                        <div className={props.className} style={{width: '2rem'}}>
                            {props.icon}
                        </div>
                        <div className="tests-title">
                            <h3>{props.name}</h3>
                        </div>
                    </div>
                    <button 
                        className="tests-right" 
                        onClick={() => setExpanded(!expanded)}
                        style={{ cursor: 'pointer' }}
                    >
                        <strong><span>{props.rule}</span></strong>
                        <ChevronDown 
                            size={20} 
                            style={{
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease'
                            }} 
                        />
                    </button>
                </div>
                {expanded && (
                    <div className='expanded-results'>
                        {results && results.results.map((result) => (
                            <Result
                                key={result.id}
                                id={String(result.id)}
                                description={result.description}
                                evaluation_id={props.evaluation_id}
                                webpage_url={props.webpage_url}
                                webpage_screenshot={props.webpage_screenshot}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Assertion;