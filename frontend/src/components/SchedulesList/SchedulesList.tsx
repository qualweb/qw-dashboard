import { useEffect, useState } from 'react';
import './SchedulesList.css'
import { getSchedules } from '../../services/ScheduleService';
import ScheduleCard from '../ScheduleCard/ScheduleCard';

interface SchedulesListProps {
    monitoring_id?: string;
    refresh?: boolean;
    onRefresh: () => void;
}

function SchedulesList(props: SchedulesListProps) {
    const [schedulesIds, setSchedulesIds] = useState([]);
    
    useEffect(() => {
        const fetchSchedules = async () => {
            const data = await getSchedules(props.monitoring_id);
            setSchedulesIds(data);
        };

        fetchSchedules();
    }, [props.monitoring_id, props.refresh]);


    return (
        <div className='schedules-list'>
            <div className='schedules-list-title'>
                <h2>Schedules List</h2>
            </div>
            <div className="schedules-list-container">
                {schedulesIds.map((scheduleId) => (
                    <ScheduleCard
                        key={scheduleId}
                        scheduleId={scheduleId}
                        onRefresh={props.onRefresh}
                    />
                ))}
            </div>
        </div>
    );
}

export default SchedulesList;