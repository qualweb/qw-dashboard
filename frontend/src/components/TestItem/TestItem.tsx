import './TestItem.css';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ResultItem from '../ResultItem/ResultItem';
import { Test } from '../Types/Types.tsx';

interface TestItemProps {
    test: Test;
    className: string;
    icon: React.ReactNode;
}

const TestItem: React.FC<TestItemProps> = ({ test, className, icon }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(prev => !prev);
    };

    return (
        <div className="tests-item" key={test.description}>
            <div className="tests-header">
                <div className='wrapper-4'>
                    <div className="tests-left">
                        <div className={className} style={{width: '2rem'}}>
                            {icon}
                        </div>
                        <div className="tests-title">
                            <h3>{test.description}</h3>
                        </div>
                    </div>
                    <button 
                        className="tests-right" 
                        onClick={toggleExpand}
                        style={{ cursor: 'pointer' }}
                    >
                        <strong><span>{test.rule}</span></strong>
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
                        {test.results.map((result) =>
                            <ResultItem 
                                key={result.id}
                                result={result}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestItem;