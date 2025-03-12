import "./IssuesWebsiteItem.css";
import { Globe, ChevronDown } from 'lucide-react';
import { EvaluationData, WebsiteTestData } from "../Types/Types.tsx";
import CategoryItem from "../CategoryItem/CategoryItem.tsx";

interface IssueItemProps {
  url: string;
  evalData: EvaluationData;
  expandedItems: {
    [url: string]: boolean;
  };
  toggleExpand: (url: string) => void;
}

const IssuesWebsiteItem: React.FC<IssueItemProps> = ({ url, evalData, expandedItems, toggleExpand }) => {
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
          <button
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
          </button>
        </div>
        {expandedItems[url] && (
          <div className="expanded-content">
          {Object.keys(evalData[url]).map((category) => {
            const categoryKey = category as keyof WebsiteTestData;
            switch (categoryKey) {
              case 'passed':
                return <CategoryItem key={categoryKey} tests={evalData[url].passed.tests} category='passed' />;
              case 'warnings':
                return <CategoryItem key={categoryKey} tests={evalData[url].warnings.tests} category='warnings' />;
              case 'failed':
                return <CategoryItem key={categoryKey} tests={evalData[url].failed.tests} category='failed' />;
              case 'inapplicable':
                return <CategoryItem key={categoryKey} tests={evalData[url].inapplicable.tests} category='inapplicable' />;
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