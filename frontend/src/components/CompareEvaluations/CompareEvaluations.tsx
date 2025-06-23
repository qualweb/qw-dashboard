import { useParams } from 'react-router-dom';
import CompareWebsiteStats from '../CompareWebsiteStats/CompareWebsiteStats';
import DashboardMenu from '../DashboardMenu/DashboardMenu';
import WebpagesList from '../WebpagesList/WebpagesList';
import './CompareEvaluations.css';
import WebsiteIdentifier from '../WebsiteIdentifier/WebsiteIdentifier';
import { useEffect, useState } from 'react';
import { useMonitoringApi } from '../../services/EvaluationService';

function CompareEvaluations() {
    const { getWebsiteMonitoringCycle } = useMonitoringApi();

    const { monitoring_id, first_cycle, second_cycle } = useParams();
    const [fst_cycle, setFstCycle] = useState();
    const [snd_cycle, setSndCycle] = useState();

    useEffect(() => {
        const fetchMonitoringCycles = async () => {
            if (!first_cycle || !second_cycle) return;
            
            const data1 = await getWebsiteMonitoringCycle(first_cycle);
            const data2 = await getWebsiteMonitoringCycle(second_cycle);

            setFstCycle(data1);
            setSndCycle(data2);
        }

        fetchMonitoringCycles();
    }, [first_cycle, second_cycle]);

    return (
        <div className="compare-evaluations">
            <DashboardMenu monitoring_id={String(monitoring_id)}/>
            <div className='compare-evaluations-container'>
                <div className='website-identifier-dates-container'>
                    <WebsiteIdentifier monitoring_id={String(monitoring_id)}/>
                    {fst_cycle && snd_cycle && (
                        <div className='from-to'>
                            <span><strong>From: {fst_cycle['cycle_date']['day']}/{fst_cycle['cycle_date']['month']}/{fst_cycle['cycle_date']['year']} {fst_cycle['cycle_date']['hour']}:{fst_cycle['cycle_date']['minute']}:{fst_cycle['cycle_date']['second']}</strong></span>
                            <span><strong>To: {snd_cycle['cycle_date']['day']}/{snd_cycle['cycle_date']['month']}/{snd_cycle['cycle_date']['year']} {snd_cycle['cycle_date']['hour']}:{snd_cycle['cycle_date']['minute']}:{snd_cycle['cycle_date']['second']}</strong></span>
                        </div>
                    )}
                </div>
                <div className='website-level'>
                    <h2>Website Level</h2>
                    <CompareWebsiteStats
                        monitoring_id={String(monitoring_id)}
                        first_cycle={String(first_cycle)}
                        second_cycle={String(second_cycle)}
                    />
                </div>
                <div className='webpage-level'>
                    <h2>Webpage Level</h2>
                    <WebpagesList 
                        monitoring_id={String(monitoring_id)}
                        first_cycle={String(first_cycle)}
                        second_cycle={String(second_cycle)}
                    />
                </div>
            </div>
        </div>
    );
}

export default CompareEvaluations;