import './IssuesListWidget.css';
import { ChevronDown } from 'lucide-react';
import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { useEffect, useState } from 'react';
import { CheckIcon, FailIcon, Warning2Icon, InapplicableIcon } from '../../assets/Icons'
import IssuesWebsiteItem from '../IssuesWebsiteItem/IssuesWebsiteItem';
import { AssertionsGroupedByOutcomeResponse, WebpageIssueResponse } from '../Types/Types.tsx';
import { getCurrentIssuesByTest, getCurrentIssuesByWebpage } from '../../services/EvaluationService.tsx';
import CircularLoader from '../CircularLoader/CircularLoader.tsx';
import CategoryItem from '../CategoryItem/CategoryItem.tsx';
import Filters from '../Filters/Filters.tsx';
import { getCategory } from '../utils/utils.ts';

interface ExpandedItems {
    [url: string]: boolean;
}

interface IssuesListWidgetProps {   
    monitoring_id: string;
}

function IssuesListWidget(props: IssuesListWidgetProps) {
    const [selectedFilter, setSelectedFilter] = useState("By webpage");
    const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});
    const [loading, setLoading] = useState(false);
    const [issuesByWebpage, setIssuesByWebpage] = useState([]);
    const [issuesByTest, setIssuesByTest] = useState(null);

    // Filters
    const [wcagLevelFilters, setWcagLevelFilters] = useState<string[]>([]);
    const [statusFilters, setStatusFilters] = useState<string[]>([]);

    const toggleExpand = (url : string) => {
        setExpandedItems(prev => ({
            ...prev,
            [url]: !prev[url]
        }));
    };

    const filters = createListCollection({
        items: [
          { label: 'By webpage', value: 'By webpage' },
          { label: 'By test', value: 'By test' },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            
            switch (selectedFilter) {
                case 'By webpage':
                    { 
                        setLoading(true);
                        const data = await getCurrentIssuesByWebpage(props.monitoring_id);
                        setIssuesByWebpage(data);
                        setLoading(false);
                        break; 
                    }
                case 'By test':
                    {
                        setLoading(true);
                        const data = await getCurrentIssuesByTest(props.monitoring_id);

                        setIssuesByTest(data);
                        setLoading(false);
                        break;
                    }
                default:
                    break;
            }
        }
        fetchData();
    }, [selectedFilter, props.monitoring_id]);

    return (
        <div className='issues-container'>
            <div className="header">
                <div className='pills'>
                    <div className="title-pill"><h2>Current Accessibility Issues</h2></div>
                    <div className='filter-pills'>
                        <Select.Root collection={filters}>
                            <Select.Label className="sr-only">
                                <strong>Current website</strong>
                            </Select.Label>
                            <Select.Control className='select-control'>
                                <Select.Trigger className="select-trigger">
                                    <strong><Select.ValueText className="select-value" placeholder={selectedFilter} /></strong>
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
                                                <Select.Item key={item.value} item={item} className="select-item" onClick={() => {setSelectedFilter(item.value)}}>
                                                    <Select.ItemText>{item.label}</Select.ItemText>
                                                </Select.Item>
                                            ))}
                                        </Select.ItemGroup>
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                            <Select.HiddenSelect />
                        </Select.Root>
                        
                        <div className="stats-pill">
                            <div className="stat-success">
                                <span><strong>53</strong></span>
                                {CheckIcon}
                            </div>
                            <div className="stat-warning">
                                <span><strong>2</strong></span>
                                {Warning2Icon}
                            </div>
                            <div className="stat-fail">
                                <span><strong>4</strong></span>
                                {FailIcon}
                            </div>
                            <div className="stat-inapplicable">
                                <span><strong>4</strong></span>
                                <div className='circle'>
                                    {InapplicableIcon}
                                </div>
                            </div>
                        </div>
                        <Filters 
                            wcagLevels={wcagLevelFilters}
                            status={statusFilters}
                            setStatusFilter={setStatusFilters}
                            setWcagLevelFilter={setWcagLevelFilters}
                        />
                    </div>
                </div>
            </div>
            
            <div className="issues-list">
                {selectedFilter === 'By webpage' && !loading && issuesByWebpage ? (
                    issuesByWebpage.map((webpage : WebpageIssueResponse) => (
                        <IssuesWebsiteItem
                            key={webpage.url}
                            url={webpage.url}
                            assertions={webpage.assertions}
                            expandedItems={expandedItems}
                            toggleExpand={toggleExpand}
                            statusFilters={statusFilters}
                            wcagLevelFilters={wcagLevelFilters}
                        />
                    ))
                ) : selectedFilter === 'By test' && !loading && issuesByTest ? (
                    Object.keys(issuesByTest).map((category) => {
                        if (statusFilters.length === 0 || statusFilters.includes(getCategory(category))) {
                            const categoryKey = category as keyof AssertionsGroupedByOutcomeResponse;
                            return (
                                <CategoryItem key={categoryKey} tests={issuesByTest[categoryKey]} category={categoryKey} wcagLevelFilters={wcagLevelFilters}/>
                            )
                        }
                    })
                ) : loading ? (
                    <CircularLoader />
                ) : null }
            </div>
        </div>
    );
}

export default IssuesListWidget;