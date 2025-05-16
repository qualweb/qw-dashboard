import { useParams } from 'react-router-dom';
import DashboardMenu from '../DashboardMenu/DashboardMenu';
import './Evaluate.css'
import { CheckIcon, Trash2 } from 'lucide-react';
import { Checkbox } from '@ark-ui/react/checkbox';
import { Chart } from '../../assets/Icons';
import { createListCollection } from '@ark-ui/react/collection';
import { useEffect, useState } from 'react';
import { addLatestEvalsMonitoringCycle, calculateScores, createMonitoringCycle, deleteWebpage, getMonitoredWebpages, runEvaluation } from '../../services/EvaluationService';
import { Webpage } from '../Types/Types';
import AddWebpages from '../AddWebpages/AddWebpages';

function Evaluate() {
    const { monitoring_id } = useParams();

    const webpagesToEval : string[] = [];
    const [monitoredWebpages, setMonitoredWepages] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    
    const refreshWebpages = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    useEffect(() => {
        const fetchMonitoredWebpages = async () => {
            if (!monitoring_id) return;
            
            try {
                const data = await getMonitoredWebpages(monitoring_id);
                setMonitoredWepages(data);
            } catch (error) {
                console.error('Error fetching monitored webpages:', error);
            }
        }

        fetchMonitoredWebpages();
    }, [monitoring_id, refreshTrigger]);

    const items = createMonitoredWebpagesCollection(monitoredWebpages);

    const collection = createListCollection({
        items: items,
    });

    const addWebpage = (url: string): void => {
        webpagesToEval.push(url);
    };

    const removeWebpage = async (webpage: string) => {
        webpagesToEval.splice(webpagesToEval.indexOf(webpage), 1);

        const removeWebpage = async () => {
            await deleteWebpage(webpage);
        }

        await removeWebpage();
        refreshWebpages();
    };

    const evaluateWebpages = async (): Promise<void> => {
        if (!monitoring_id) return;

        const monitoring_cycle_id = await createMonitoringCycle(monitoring_id);

        for (const webpage of webpagesToEval) {
            await runEvaluation(monitoring_id, webpage);
        }

        await addLatestEvalsMonitoringCycle(monitoring_cycle_id);
    
        await calculateScores(monitoring_id);
    };

    return (
        <div className='evaluate-wrapper'>
            <DashboardMenu monitoring_id={String(monitoring_id)} />
            {monitoring_id ? (
                <div className='evaluate-container'>
                    <div className='evaluate-title-container'>
                        {Chart}
                        <h2>Evaluate</h2>
                    </div>
                    <div className='add-webpages-container'>
                        <AddWebpages monitoring_id={monitoring_id} />
                    </div>
                    <Checkbox.Group className='webpages-container' name="framework" onValueChange={console.log}>
                        {collection.items.map((item) => (
                            <div className='webpage-container'>
                                <div className='checkbox-webpage-container'>
                                    <Checkbox.Root className='checkbox-webpage' value={item.value} key={item.value}>
                                        <Checkbox.Control className='checkbox-webpage-control' onClick={() => {
                                            if (webpagesToEval.includes(item.value)) {
                                                removeWebpage(item.value);
                                                console.log(webpagesToEval)
                                            } else {
                                                addWebpage(item.value);
                                                console.log(webpagesToEval)
                                            }
                                        }}>
                                            <Checkbox.Indicator className='checkbox-webpage-indicator'>
                                                <CheckIcon />
                                            </Checkbox.Indicator>
                                        </Checkbox.Control>
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Label className='checkbox-webpage-label'>{item.label}</Checkbox.Label>
                                    </Checkbox.Root>
                                    <button className='checkbox-webpage-trash-button' onClick={() => {
                                        removeWebpage(item.value);
                                    }}>
                                        <Trash2 />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </Checkbox.Group>
                    <div className='evaluate-button-container'>
                        <button className='evaluate-button' onClick={() => {
                            evaluateWebpages()
                        }}>Evaluate</button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Evaluate;


function createMonitoredWebpagesCollection(monitoredWebpages: Webpage[]) {
    const items: { label: string, value: string }[] = [];
    
    monitoredWebpages.forEach((webpage : Webpage) => {
        items.push({ 
            label: webpage.url, 
            value: webpage.id.toString()
        });
    });
    
    return items;
}