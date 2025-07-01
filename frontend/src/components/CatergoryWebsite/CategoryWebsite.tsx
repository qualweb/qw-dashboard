import './CategoryWebsite.css';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CheckIcon, FailIcon, Warning2Icon, InapplicableIcon } from '../../assets/Icons.tsx';
import { useMonitoringApi } from '../../services/EvaluationService.tsx';
import AggregatedAssertions from '../AggregatedAssertions/AggregatedAssertions.tsx';

interface CategoryWebsiteProps {
    monitoring_id: string;
    evaluation_ids: string[];
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

function CategoryWebsite(props: CategoryWebsiteProps) {
    const { getLatestAssertionsByTest } = useMonitoringApi();

    const [expanded, setExpanded] = useState(false);
    const [assertions, setAssertions] = useState([]);

    useEffect(() => {
        const fetchAssertions = async () => {
            const response = await getLatestAssertionsByTest(props.monitoring_id, 'act-rules', props.wcagGuidelinesFilters, props.wcagLevelFilters, props.outcome);
            setAssertions(response.assertions);
        }

        fetchAssertions();
    }, [props.monitoring_id, props.evaluation_ids, props.wcagLevelFilters, props.outcome, props.wcagGuidelinesFilters]);

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInnerButtonClick = (event: any) => {
        event.stopPropagation();
    };

    return (
        <button className="category-item" onClick={(event) => {          
            setExpanded(!expanded)          
            handleInnerButtonClick(event)       
        }} >
            <div className="category-header">
                <div className="wrapper-3">
                    <div className="category-left">
                        <div className={className}>
                            {icon}
                        </div>
                        <span className="category-title">
                            <h3>{props.outcome.charAt(0).toUpperCase() + props.outcome.slice(1)} - {assertions.length} tests</h3>
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
                <div className="tests-container">
                    {expanded && (
                        <div className="expanded-tests-2">
                            {assertions && assertions.map((assertion) => {
                                return <AggregatedAssertions
                                    key={assertion['assertion_rule']}
                                    rule={assertion['assertion_rule']}
                                    name={assertion['assertion_name']}
                                    icon={icon}
                                    className={className}
                                    assertion_ids={assertion['assertion_ids']}
                                    assertion_outcome={props.outcome}
                                />
                            })}
                        </div>
                    )}
                </div>
            </div>
        </button>
    );
};

export default CategoryWebsite;