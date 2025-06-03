import './Assertion.css';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
    const [results, setResults] = useState([]);
    
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
                    </div>
                    <div className="tests-right">
                        <strong><span>{props.rule}</span></strong>
                        <ChevronDown 
                            size={20} 
                            style={{
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease'
                            }} 
                        />
                    </div>
                </div>
                {expanded && (
                    <div className='expanded-results'>
                        {results && results.map((result) => (
                            <Result
                                key={result["id"]}
                                id={String(result["id"])}
                                description={result["description"]}
                                evaluation_id={props.evaluation_id}
                                webpage_url={props.webpage_url}
                                webpage_screenshot={props.webpage_screenshot}
                                verdict={result["verdict"]}
                            />
                        ))}
                    </div>
                )}
            </div>
        </button>
    );
};

export default Assertion;