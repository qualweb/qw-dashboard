import './TestItem.css';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ResultItem from '../ResultItem/ResultItem';
import { AssertionResponse } from '../Types/Types.tsx';

interface TestItemProps {
    test: AssertionResponse;
    className: string;
    icon: React.ReactNode;
}

const TestItem: React.FC<TestItemProps> = ({ test, className, icon }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(prev => !prev);
    };

    return (
        <div className="tests-item" key={test.id}>
            <div className="tests-header">
                <div className='wrapper-4'>
                    <div className="tests-left">
                        <div className={className} style={{width: '2rem'}}>
                            {icon}
                        </div>
                        <div className="tests-title">
                            <h3>{test.metadata?.description}</h3>
                        </div>
                    </div>
                    <button 
                        className="tests-right" 
                        onClick={toggleExpand}
                        style={{ cursor: 'pointer' }}
                    >
                        <strong><span>{test.metadata?.code}</span></strong>
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
                        {test.issues && test.issues.map((issue) => (
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

export default TestItem;