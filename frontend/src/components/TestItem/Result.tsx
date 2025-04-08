import './Result.css';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ResultItem from '../Result/Result.tsx';

interface ResultProps {
    id: string;
}

function Result(props: ResultProps) {
    const [expanded, setExpanded] = useState(false);
    const [assertion, setAssertion] = useState<AssertionResponse>([]);
    

    useEffect(() => {
        const fetchAssertion = async () => {
            const data = await getLatestACTAssertions(props.evaluation_id, props.wcagLevelFilters, props.outcome);
            setAssertions(data);
        }
        fetchAssertion();
    }, [props.evaluation_id, props.wcagLevelFilters, props.outcome]);

    return (
        <div className="tests-item" key={props.id}>
            <div className="tests-header">
                <div className='wrapper-4'>
                    <div className="tests-left">
                        <div className={props.className} style={{width: '2rem'}}>
                            {props.icon}
                        </div>
                        <div className="tests-title">
                            <h3>{props.test.metadata?.description}</h3>
                        </div>
                    </div>
                    <button 
                        className="tests-right" 
                        onClick={() => setExpanded(!expanded)}
                        style={{ cursor: 'pointer' }}
                    >
                        <strong><span>{props.test.metadata?.code}</span></strong>
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
                        {props.test.issues && props.test.issues.map((issue) => (
                            issue.elements.map((element) => (
                                <ResultItem 
                                    key={element.id}
                                    result={element}
                                    description={issue.description}
                                />
                            ))
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Result;