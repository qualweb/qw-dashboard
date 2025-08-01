import "./IssuesWebsiteItem.css";
import { Globe, ChevronDown } from 'lucide-react';
import { useState } from "react";
import CategoryPerWebpage from "../CategoryPerWebpage/CategoryPerWebpage.tsx";

interface IssueItemProps {
  evaluation_id: string;
  webpage_url: string;
  statusFilters: string[];
  wcagLevelFilters: string[];
  wcagGuidelinesFilters: string[];
}

function IssuesWebsiteItem(props: IssueItemProps) {
  const [expanded, setExpanded] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInnerButtonClick = (event: any) => {
    event.stopPropagation();
  };

  const categories = ["passed", "warning", "failed", "inapplicable"];

  return (
    <div className="issue-item-container" key={props.webpage_url}>
      <button className="issue-item" 
        onClick={(event) => {          
          setExpanded(!expanded)          
          handleInnerButtonClick(event) 
        }} 
        aria-label={'Issues from ' + props.webpage_url}
        aria-expanded={expanded}
      >
        <div className='issue-main-info-wrapper'>
          <div className="issue-left">
            <div className="globe-icon">
              <Globe size={24} />
            </div>
            <h3 className="issue-url">{props.webpage_url}</h3>
          </div>
          <div
            className="issue-right"
          >
            <strong><span>More info</span></strong>
            <ChevronDown
              size={20}
              style={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}
            />
          </div>
        </div>
      </button>
      {expanded &&
        <div className="expanded-content">
          {props.statusFilters.length !== 0 &&
            props.statusFilters.map((category) => {
              return <CategoryPerWebpage 
                key={category}
                evaluation_id={props.evaluation_id}
                outcome={category} 
                wcagLevelFilters={props.wcagLevelFilters}
                wcagGuidelinesFilters={props.wcagGuidelinesFilters}
              />;
          })}
          {props.statusFilters.length === 0 &&
            categories.map((category) => {
              return <CategoryPerWebpage 
                key={category}
                evaluation_id={props.evaluation_id} 
                outcome={category} 
                wcagLevelFilters={props.wcagLevelFilters} 
                wcagGuidelinesFilters={props.wcagGuidelinesFilters}
              />;
          })}
        </div>
      }
    </div>
  );
};

export default IssuesWebsiteItem;