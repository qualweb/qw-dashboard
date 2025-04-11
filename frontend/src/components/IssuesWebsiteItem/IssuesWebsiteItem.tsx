import "./IssuesWebsiteItem.css";
import { Globe, ChevronDown } from 'lucide-react';
import { useEffect, useState } from "react";
import CategoryPerWebpage from "../CategoryPerWebpage/CategoryPerWebpage.tsx";
import { getWebpageScreenshot } from "../../services/EvaluationService.tsx";

interface IssueItemProps {
  evaluation_id: string;
  webpage_url: string;
  statusFilters: string[];
  wcagLevelFilters: string[];
}

function IssuesWebsiteItem(props: IssueItemProps) {
  const [expanded, setExpanded] = useState(false);

  const categories = ["passed", "warning", "failed", "inapplicable"];

  const [webpageScreehshot, setWebpageScreehshot] = useState('');

    useEffect(() => {
      const fetchWebpageScreenshot = async () => {
          const data = await getWebpageScreenshot(props.evaluation_id);

          setWebpageScreehshot(data);
      }
      fetchWebpageScreenshot();
  }, [props.evaluation_id]);

  return (
    <div className="issue-item-container" key={props.webpage_url}>
      <div className="issue-item">
        <div className='issue-main-info-wrapper'>
          <div className="issue-left">
            <div className="globe-icon">
              <Globe size={24} />
            </div>
            <h3 className="issue-url">{props.webpage_url}</h3>
          </div>
          <button
            className="issue-right"
            onClick={() => setExpanded(!expanded)}
            style={{ cursor: 'pointer' }}
          >
            <strong><span>More info</span></strong>
            <ChevronDown
              size={20}
              style={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}
            />
          </button>
        </div>
        {expanded &&
          <div className="expanded-content">
            {props.statusFilters.length !== 0 &&
              props.statusFilters.map((category) => {
                return <CategoryPerWebpage 
                  key={category}
                  evaluation_id={props.evaluation_id}
                  outcome={category} 
                  wcagLevelFilters={props.wcagLevelFilters}
                  webpage_screenshot={webpageScreehshot}
                />;
            })}
            {props.statusFilters.length === 0 &&
              categories.map((category) => {
                return <CategoryPerWebpage 
                  key={category}
                  evaluation_id={props.evaluation_id} 
                  outcome={category} 
                  wcagLevelFilters={props.wcagLevelFilters} 
                  webpage_screenshot={webpageScreehshot}
                />;
            })}
          </div>
        }
      </div>
    </div>
  );
};

export default IssuesWebsiteItem;