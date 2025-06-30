import './CategoryWebsite.css';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CheckIcon, FailIcon, Warning2Icon, InapplicableIcon } from '../../assets/Icons.tsx';
import { GetLatestACTAssertion, GetLatestACTAssertionsResponse } from "../Types/Types.ts";
import { useMonitoringApi } from '../../services/EvaluationService.tsx';
import Assertion from '../Assertion/Assertion.tsx';

interface CategoryWebsiteProps {
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

function  CategoryWebsite(props: CategoryWebsiteProps) {
    const { getLatestAssertions, getWebpageScreenshot } = useMonitoringApi();

    const [expanded, setExpanded] = useState(false);
    const [assertions, setAssertions] = useState<GetLatestACTAssertionsResponse>();
    const [webpageScreenshots, setWebpageScreenshots] = useState<string[]>([]);

    useEffect(() => {
        const fetchAssertions = async () => {
            const data: GetLatestACTAssertionsResponse = { assertions: [] };
            const screenshots = [];

            for (let i = 0; i < props.evaluation_ids.length; i++) {
                const response = await getLatestAssertions(props.evaluation_ids[i], 'act-rules', props.wcagGuidelinesFilters, props.wcagLevelFilters, props.outcome);
                if (response && response.assertions) {
                    response.assertions.forEach((element: GetLatestACTAssertion) => {
                        data.assertions.push(element);
                    });
                };

                const screenshot = await getWebpageScreenshot(props.evaluation_ids[i]);
                screenshots.push(screenshot);
            }

            setAssertions(data);
            setWebpageScreenshots(screenshots);
        }
        fetchAssertions();
    }, [props.evaluation_ids, props.wcagLevelFilters, props.outcome, props.wcagGuidelinesFilters]);

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
        <div className="category-item">
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
                <button className="category-right" onClick={() => setExpanded(!expanded)}>
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
                    {assertions && range(0, assertions.assertions.length - 1).map((index) => (
                        <Assertion 
                            key={assertions.assertions[index].id}
                            id={String(assertions.assertions[index].id)}
                            name={assertions.assertions[index].name}
                            rule= {assertions.assertions[index].rule}
                            icon={icon}
                            className={className}
                            evaluation_id={String(assertions.assertions[index].evaluation_id)}
                            webpage_url={assertions.assertions[index].webpage_url}
                            webpage_screenshot={webpageScreenshots[index]}
                            assertion_outcome={props.outcome}
                        />
                    ))}
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default CategoryWebsite;

function range (start: number, end: number) {
    const result = [];

    for (let i = start; i <= end; i++) {
        result.push(i);
    }

    return result;
}