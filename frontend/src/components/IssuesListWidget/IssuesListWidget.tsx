import './IssuesListWidget.css';
import { Check, ChevronDown } from 'lucide-react';
import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { useEffect, useState } from 'react';
import { CheckIcon, FailIcon, Warning2Icon, InapplicableIcon } from '../../assets/Icons'
import IssuesWebsiteItem from '../IssuesWebsiteItem/IssuesWebsiteItem';
import { useMonitoringApi } from '../../services/EvaluationService.tsx';
import CircularLoader from '../CircularLoader/CircularLoader.tsx';
import Filters from '../Filters/Filters.tsx';
import CategoryWebsite from '../CatergoryWebsite/CategoryWebsite.tsx';

interface IssuesListWidgetProps {   
    monitoring_id: string;
}

function IssuesListWidget(props: IssuesListWidgetProps) {
    const { getLatestEvaluations, getIssuesStats } = useMonitoringApi();

    const [selectedFilter, setSelectedFilter] = useState("By webpage");
    const [loading, setLoading] = useState(false);
    const [issuesStats, setIssuesStats] = useState(null);
    const [lastestEvaluations, setLatestEvaluations] = useState([]);
    const [latestEvalIds, setLatestEvalIds] = useState<string[]>([]);

    // Filters
    const [wcagLevelFilters, setWcagLevelFilters] = useState<string[]>([]);
    const [statusFilters, setStatusFilters] = useState<string[]>([]);
    const [wcagGuidelinesFilters, setWcagGuidelinesFilters] = useState<string[]>([]);

    const categories = ["passed", "warning", "failed", "inapplicable"];

    const filters = createListCollection({
        items: [
          { label: 'By webpage', value: 'By webpage', selected: true },
          { label: 'By test', value: 'By test' },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            
            switch (selectedFilter) {
                case 'By webpage':
                    { 
                        setLoading(true);
                        const data = await getLatestEvaluations(props.monitoring_id);
                        setLatestEvaluations(data);
                        setLoading(false);
                        break; 
                    }
                case 'By test':
                    {
                        setLoading(true);
                        const latest_evals = await getLatestEvaluations(props.monitoring_id);

                        const ids : string[] = []

                        for (let i = 0; i < latest_evals.length; i++) {
                            ids[i] = latest_evals[i].id;
                        }
                        setLatestEvalIds(ids);

                        setLoading(false);
                        break;
                    }
                default:
                    break;
            }
        }
        fetchData();
    }, [selectedFilter, props.monitoring_id]);

    useEffect(() => {
        const fetchIssuesStats = async () => {
            const data = await getIssuesStats(props.monitoring_id);
            setIssuesStats(data);
        }
        fetchIssuesStats();
    }, [props.monitoring_id]);

    return (
        <div className='issues-container'>
            <div className="header">
                <div className='pills'>
                    <div className="title-pill"><h2>Current Accessibility Issues</h2></div>
                    <div className='filter-pills'>
                        <Select.Root 
                            collection={filters} 
                            defaultValue={[selectedFilter]}
                            aria-label='Filters' 
                            onValueChange={(details) => {
                                setSelectedFilter(details.value[0]);
                            }}
                        >
                            <Select.Control className='select-control'>
                                <Select.Trigger className="select-trigger">
                                    <strong><Select.ValueText className="select-value" /></strong>
                                    <Select.Indicator className="select-indicator">
                                        <ChevronDown size={20} />
                                    </Select.Indicator>
                                </Select.Trigger>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content className="select-content">
                                        <Select.ItemGroup className="select-item-group">
                                            {filters.items.map((item) => (
                                                <Select.Item key={item.value} item={item} className="select-item">
                                                    <Select.ItemText>{item.label}</Select.ItemText>
                                                    <Select.ItemIndicator>
                                                        <Check />
                                                    </Select.ItemIndicator>
                                                </Select.Item>
                                            ))}
                                        </Select.ItemGroup>
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                            <Select.HiddenSelect />
                        </Select.Root>
                        
                        {issuesStats &&
                            <div className="stats-pill">
                                <div className="stat-success">
                                    <span><strong>{issuesStats["passed"]}</strong></span>
                                    {CheckIcon}
                                </div>
                                <div className="stat-warning">
                                    <span><strong>{issuesStats["warnings"]}</strong></span>
                                    {Warning2Icon}
                                </div>
                                <div className="stat-fail">
                                    <span><strong>{issuesStats["failed"]}</strong></span>
                                    {FailIcon}
                                </div>
                                <div className="stat-inapplicable">
                                    <span><strong>{issuesStats["inapplicable"]}</strong></span>
                                    <div className='circle'>
                                        {InapplicableIcon}
                                    </div>
                                </div>
                            </div>
                        }
                        <Filters 
                            wcagGuidelines={wcagGuidelinesFilters}
                            wcagLevels={wcagLevelFilters}
                            status={statusFilters}
                            setStatusFilter={setStatusFilters}
                            setWcagLevelFilter={setWcagLevelFilters}
                            setGuidelineFilter={setWcagGuidelinesFilters}
                        />
                    </div>
                </div>
            </div>
            
            <div className="issues-list">
                {selectedFilter === 'By webpage' && !loading && lastestEvaluations ? (
                    lastestEvaluations.map((evaluation) => (
                        <IssuesWebsiteItem
                            key={evaluation["id"]}
                            webpage_url={evaluation["url"]}
                            evaluation_id={String(evaluation["id"])}
                            statusFilters={statusFilters}
                            wcagLevelFilters={wcagLevelFilters}
                            wcagGuidelinesFilters={wcagGuidelinesFilters}
                        />
                    ))
                ) : selectedFilter === 'By test' && !loading && lastestEvaluations ? (
                    <>
                      {statusFilters.length !== 0 &&
                        statusFilters.map((category) => {
                            return <CategoryWebsite 
                                key={category}
                                monitoring_id={props.monitoring_id}
                                evaluation_ids={latestEvalIds} 
                                outcome={category} 
                                wcagLevelFilters={wcagLevelFilters}
                                wcagGuidelinesFilters={wcagGuidelinesFilters} 
                            />;
                        })
                      }
                      {statusFilters.length === 0 &&
                        categories.map((category) => {
                            return <CategoryWebsite 
                                key={category}
                                monitoring_id={props.monitoring_id}
                                evaluation_ids={latestEvalIds}
                                outcome={category} 
                                wcagLevelFilters={wcagLevelFilters}
                                wcagGuidelinesFilters={wcagGuidelinesFilters}
                            />;
                        })
                      }
                    </>
                ) : loading ? (
                    <CircularLoader />
                ) : null }
            </div>
        </div>
    );
}

export default IssuesListWidget;