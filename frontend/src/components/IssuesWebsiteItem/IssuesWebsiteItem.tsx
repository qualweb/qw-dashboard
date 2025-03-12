import "./IssuesWebsiteItem.css";
import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { CheckIcon, FailIcon, Warning2Icon, InapplicableIcon } from '../../assets/Icons';
import TestItem from "../TestItem/TestItem";
import { EvaluationData, Test, WebsiteTestData } from "../Types/Types.tsx";

interface IssueItemProps {
  url: string;
  evalData: EvaluationData;
  expandedItems: {
    [url: string]: boolean;
  };
  toggleExpand: (url: string) => void;
}

const categoryConfig = {
  passed: { icon: CheckIcon, className: "status-icon-success" },
  warnings: { icon: Warning2Icon, className: "status-icon-warning" },
  failed: { icon: FailIcon, className: "status-icon-failed" },
  inapplicable: { icon: InapplicableIcon, className: "status-icon-inapplicable" }
};

const IssuesWebsiteItem: React.FC<IssueItemProps> = ({ url, evalData, expandedItems, toggleExpand }) => {
  const [expandedTests, setExpandedTests] = useState({
    passed: false,
    warnings: false,
    failed: false,
    inapplicable: false
  });

  const toggleTestExpand = (category: keyof typeof expandedTests) => {
    setExpandedTests(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const renderCategoryItem = (tests: Test[], category: keyof WebsiteTestData) => {
    const { icon, className } = categoryConfig[category];
    return (
      <div className="category-item" key={category}>
        <div className="category-header">
          <div className="wrapper-3">
            <div className="category-left">
              <div className={className}>
                {icon}
              </div>
              <span className="category-title">
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)} - {evalData[url][category].tests.length} tests</h3>
              </span>
            </div>
            <div className="category-right" onClick={() => toggleTestExpand(category)}>
              <strong><span>More info</span></strong>
              <ChevronDown
                size={20}
                style={{
                  transform: expandedTests[category] ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
          <div className="tests-container">
            {expandedTests[category] && (
              <div className="expanded-tests-2">
                {tests.map((test) =>
                  <TestItem 
                    key={test.id}
                    test={test}
                    className={className}
                    icon={icon}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="issue-item-container" key={url}>
      <div className="issue-item">
        <div className='issue-main-info-wrapper'>
          <div className="issue-left">
            <div className="globe-icon">
              <Globe size={24} />
            </div>
            <h3 className="issue-url">{url}</h3>
          </div>
          <div
            className="issue-right"
            onClick={() => toggleExpand(url)}
            style={{ cursor: 'pointer' }}
          >
            <strong><span>More info</span></strong>
            <ChevronDown
              size={20}
              style={{
                transform: expandedItems[url] ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}
            />
          </div>
        </div>
        {expandedItems[url] && (
          <div className="expanded-content">
            {Object.keys(evalData[url]).map((category) => {
              const categoryKey = category as keyof WebsiteTestData;
              switch (categoryKey) {
                case 'passed':
                  return renderCategoryItem(evalData[url].passed.tests, 'passed');
                case 'warnings':
                  return renderCategoryItem(evalData[url].warnings.tests, 'warnings');
                case 'failed':
                  return renderCategoryItem(evalData[url].failed.tests, 'failed');
                case 'inapplicable':
                  return renderCategoryItem(evalData[url].inapplicable.tests, 'inapplicable');
                default:
                  return null;
              }
            })}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default IssuesWebsiteItem;