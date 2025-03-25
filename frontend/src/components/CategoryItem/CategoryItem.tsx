import './CategoryItem.css';
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CheckIcon, FailIcon, Warning2Icon, InapplicableIcon } from '../../assets/Icons';
import TestItem from "../TestItem/TestItem";
import { AssertionResponse } from "../Types/Types.tsx";
import { getSuccessCriteriaLevels } from '../utils/utils.ts';

interface CategoryItemProps {
  tests: AssertionResponse[];
  category: 'passed' | 'warnings' | 'failed' | 'inapplicable';
  wcagLevelFilters: string[];
}

const categoryConfig = {
  passed: { icon: CheckIcon, className: "status-icon-success" },
  warnings: { icon: Warning2Icon, className: "status-icon-warning" },
  failed: { icon: FailIcon, className: "status-icon-failed" },
  inapplicable: { icon: InapplicableIcon, className: "status-icon-inapplicable" }
};

const CategoryItem: React.FC<CategoryItemProps> = ({ tests, category, wcagLevelFilters }) => {
  const [expanded, setExpanded] = useState(false);
  const { icon, className } = categoryConfig[category];

  const filteredTests = tests.filter((test) => 
    wcagLevelFilters.length === 0 || 
    (test.metadata && test.metadata.successCriteria.length > 0 &&
     getSuccessCriteriaLevels(test.metadata.successCriteria)
       .every(level => wcagLevelFilters.includes(String(level)))
    )
  );

  useEffect(() => {
    setNrTest(filteredTests.length);
  }, [filteredTests]);

  const [nrTest, setNrTest] = useState(filteredTests.length);

  const toggleExpand = () => {
    setExpanded(prev => !prev);
  };

  return (
    <div className="category-item">
      <div className="category-header">
        <div className="wrapper-3">
          <div className="category-left">
            <div className={className}>
              {icon}
            </div>
            <span className="category-title">
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)} - {nrTest} tests</h3>
            </span>
          </div>
          <button className="category-right" onClick={toggleExpand}>
            <strong><span>More info</span></strong>
            <ChevronDown
              size={20}
              style={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
            />
          </button>
        </div>
        <div className="tests-container">
          {expanded && (
            <div className="expanded-tests-2">
              {filteredTests.map((test) => (
                <TestItem 
                  key={test.id}
                  test={test}
                  className={className}
                  icon={icon}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;