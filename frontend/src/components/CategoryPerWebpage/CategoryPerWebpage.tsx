import './CategoryPerWebpage.css';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CheckIcon, FailIcon, Warning2Icon, InapplicableIcon } from '../../assets/Icons.tsx';
import { GetLatestACTAssertionsResponse } from "../Types/Types.ts";
import { useMonitoringApi } from '../../services/EvaluationService.tsx';
import Assertion from '../Assertion/Assertion.tsx';

interface CategoryPerWebpageProps {
  evaluation_id: string;
  outcome: string;
  wcagLevelFilters: string[];
  wcagGuidelinesFilters: string[];
}

const categoryConfig = {
  passed: { icon: CheckIcon, className: "status-icon-success" },
  warnings: { icon: Warning2Icon, className: "status-icon-warning" },
  failed: { icon: FailIcon, className: "status-icon-failed" },
  inapplicable: { icon: InapplicableIcon, className: "status-icon-inapplicable" }
};

function  CategoryPerWebpage(props: CategoryPerWebpageProps) {
  const { getLatestAssertions } = useMonitoringApi();

  const [expanded, setExpanded] = useState(false);
  const [assertions, setAssertions] = useState<GetLatestACTAssertionsResponse>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInnerButtonClick = (event: any) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const fetchAssertions = async () => {
      const data_act = await getLatestAssertions(props.evaluation_id, 'act-rules', props.wcagGuidelinesFilters, props.wcagLevelFilters, props.outcome);
      const data_qw_techniques = await getLatestAssertions(props.evaluation_id, 'wcag-techniques', props.wcagGuidelinesFilters, props.wcagLevelFilters, props.outcome);
      data_act.assertions = data_act.assertions.concat(data_qw_techniques.assertions);
      setAssertions(data_act);
    }
    fetchAssertions();
  }, [props.evaluation_id, props.wcagLevelFilters, props.outcome, props.wcagGuidelinesFilters]);

  let { icon, className } = categoryConfig.passed;

  if (props.outcome === "warning") {
    icon = categoryConfig.warnings.icon;
    className = categoryConfig.warnings.className;
  }
  else if (props.outcome === "failed") {
    icon = categoryConfig.failed.icon;
    className = categoryConfig.failed.className;
  }
  else if (props.outcome === "inapplicable") {
    icon = categoryConfig.inapplicable.icon;
    className = categoryConfig.inapplicable.className;
  }
  
  return (
    <div className="category-item-container">
      <button className="category-item" 
        onClick={(event) => {          
          setExpanded(!expanded)          
          handleInnerButtonClick(event)       
        }} 
        aria-label={`${assertions?.assertions.length} ${props.outcome} tests`}
        aria-expanded={expanded}
      >
        <div className="category-header">
          <div className="wrapper-3">
            <div className="category-left">
              <div className={className}>
                {icon}
              </div>
              <span className="category-title">
                <h3>{props.outcome.charAt(0).toUpperCase() + props.outcome.slice(1)} - {assertions?.assertions.length} tests</h3>
              </span>
            </div>
            <div className="category-right">
              <strong><span>More info</span></strong>
              <ChevronDown
                size={20}
                style={{
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
        </div>
      </button>
      {expanded && (
        <div className="expanded-content">
          {assertions && assertions.assertions.map((assertion) => (
            <Assertion 
              key={assertion.id}
              id={String(assertion.id)}
              name={assertion.name}
              rule= {assertion.rule}
              icon={icon}
              className={className}
              evaluation_id={String(assertion.evaluation_id)}
              webpage_url={assertion.webpage_url}
              assertion_outcome= {props.outcome}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPerWebpage;