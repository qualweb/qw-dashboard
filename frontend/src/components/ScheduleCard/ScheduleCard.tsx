import { useEffect, useState } from 'react';
import './ScheduleCard.css'
import { useSchedulerApi } from '../../services/ScheduleService';
import { Trash2 } from 'lucide-react';

interface ScheduleCardProps {
    scheduleId: string;
    onRefresh: () => void;
}

function ScheduleCard(props: ScheduleCardProps) {
    const { getSchedule, deleteSchedule } = useSchedulerApi();

    const [scheduleDetails, setScheduleDetails] = useState();

    useEffect(() => {
        const fetchScheduleDetails = async () => {
            const data = await getSchedule(props.scheduleId);
            setScheduleDetails(data);
        };

        fetchScheduleDetails();
    }, [props.scheduleId]);

    // Helper function to pad numbers with leading zero
    const padNumber = (num: number): string => {
        return num < 10 ? `0${num}` : num.toString();
    };

    // Helper function to convert day_of_week number to day name
    const getDayName = (dayNum: number): string => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dayNum] || dayNum.toString();
    };

    const handleScheduleDelete = (schedule_id : number) => {
        const scheduleDeletion = async () => {
            await deleteSchedule(String(schedule_id));
            props.onRefresh();
        };

        scheduleDeletion();
    }

    return (
        <div className='schedule-card'>
            {scheduleDetails && scheduleDetails['schedule_type'] === 'one-time' ? (
                <div className='schedule-card-details'>
                    <div className="schedule-type-info">
                        <h3 className='schedule-card-title'>One-Time Schedule</h3>
                        <p className='schedule-card-description'><strong>Scheduled for:</strong> {padNumber(scheduleDetails['day'])}/{padNumber(scheduleDetails['month'])}/{scheduleDetails['year']} at {padNumber(scheduleDetails['hour'])}:{padNumber(scheduleDetails['minute'])}:{padNumber(scheduleDetails['second'])}</p>
                    </div>
                    <button className='delete-schedule-button' onClick={() => {handleScheduleDelete(scheduleDetails['id'])}} ><Trash2 /></button>
                </div>
            ) : scheduleDetails && scheduleDetails['schedule_type'] === 'daily' ? (
                <div className='schedule-card-details'>
                    <div className="schedule-type-info">
                        <h3 className='schedule-card-title'>Daily Schedule</h3>
                        <p className='schedule-card-description'><strong>Scheduled for:</strong> {padNumber(scheduleDetails['hour'])}:{padNumber(scheduleDetails['minute'])}:{padNumber(scheduleDetails['second'])}</p>
                    </div>
                    <button className='delete-schedule-button' onClick={() => {handleScheduleDelete(scheduleDetails['id'])}} ><Trash2 /></button>
                </div>
            ) : scheduleDetails && scheduleDetails['schedule_type'] === 'weekly' ? (
                <div className='schedule-card-details'>
                    <div className="schedule-type-info">
                        <h3 className='schedule-card-title'>Weekly Schedule</h3>
                        <p className='schedule-card-description'><strong>Scheduled for:</strong> {getDayName(scheduleDetails['day_of_week'])} at {padNumber(scheduleDetails['hour'])}:{padNumber(scheduleDetails['minute'])}:{padNumber(scheduleDetails['second'])}</p>
                    </div>
                    <button className='delete-schedule-button' onClick={() => {handleScheduleDelete(scheduleDetails['id'])}} ><Trash2 /></button>
                </div>
            ) : scheduleDetails && scheduleDetails['schedule_type'] === 'monthly' ? (
                <div className='schedule-card-details'>
                    <div className="schedule-type-info">
                        <h3 className='schedule-card-title'>Monthly Schedule</h3>
                        <p className='schedule-card-description'><strong>Scheduled for:</strong> day {padNumber(scheduleDetails['day'])} of every month at {padNumber(scheduleDetails['hour'])}:{padNumber(scheduleDetails['minute'])}:{padNumber(scheduleDetails['second'])}</p>
                    </div>
                    <button className='delete-schedule-button' onClick={() => {handleScheduleDelete(scheduleDetails['id'])}} ><Trash2 /></button>
                </div>
            ) : scheduleDetails && scheduleDetails['schedule_type'] === 'yearly' ? (
                <div className='schedule-card-details'>
                    <div className="schedule-type-info">
                        <h3 className='schedule-card-title'>Yearly Schedule</h3>
                        <p className='schedule-card-description'><strong>Scheduled for:</strong> {padNumber(scheduleDetails['day'])}/{padNumber(scheduleDetails['month'])} at {padNumber(scheduleDetails['hour'])}:{padNumber(scheduleDetails['minute'])}:{padNumber(scheduleDetails['second'])}</p>
                    </div>
                    <button className='delete-schedule-button' onClick={() => {handleScheduleDelete(scheduleDetails['id'])}} ><Trash2 /></button>
                </div>
            ) : null }
        </div>
    );
}

export default ScheduleCard;