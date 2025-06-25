import './Schedule.css'

import { useParams } from 'react-router-dom';
import DashboardMenu from '../DashboardMenu/DashboardMenu';
import { Calendar, CheckCheck, CheckIcon, Clock3, KeyRound } from 'lucide-react';
import { Checkbox } from '@ark-ui/react/checkbox';
import { createListCollection } from '@ark-ui/react/collection';
import { useEffect, useRef, useState } from 'react';
import { useMonitoringApi } from '../../services/EvaluationService';
import { Webpage } from '../Types/Types';
import { Portal } from '@ark-ui/react/portal';
import { DatePicker } from '@ark-ui/react/date-picker';
import SelectWidget from '../SelectWidget/SelectWidget';
import { useSchedulerApi } from '../../services/ScheduleService';
import SchedulesList from '../SchedulesList/SchedulesList';
import WebsiteIdentifier from '../WebsiteIdentifier/WebsiteIdentifier';

function Schedule() {
    const { getMonitoredWebpages } = useMonitoringApi();
    const { addSchedule } = useSchedulerApi();

    const { monitoring_id } = useParams();

    const [webpagesToEval, setWebpagesToEval] = useState<[url: string, needs_authentication: boolean][]>([]);
    const [monitoredWebpages, setMonitoredWepages] = useState([]);
    const [scheduleTrigger, setScheduleTrigger] = useState(false);
    const [isScheduled, setIsScheduled] = useState(false);

    const [scheduleType, setScheduleType] = useState('');
    const [day, setDay] = useState(-1);
    const [month, setMonth] = useState(-1);
    const [year, setYear] = useState(-1);
    const [dayOfWeek, setDayOfWeek] = useState(-1);
    const [hour, setHour] = useState(-1);
    const [minute, setMinute] = useState(-1);
    const [second, setSecond] = useState(-1);

    const [refresh, setRefresh] = useState(false);
    
    const regreshTrigger = () => {
        setRefresh(!refresh);
    }
    
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
    }, [monitoring_id]);

    useEffect(() => {
        if (isScheduled) {
            const timer = setTimeout(() => {
                setIsScheduled(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isScheduled]);

    const items = createMonitoredWebpagesCollection(monitoredWebpages);

    const collection = createListCollection({
        items: items,
    });

    const addWebpage = (url_auth : [url: string, needs_authentication: boolean]): void => {
        setWebpagesToEval(prev => [...prev, url_auth]);
    };

    const removeWebpage = async (webpage: string) => {
        setWebpagesToEval(prev => prev.filter(([url, ]) => url !== webpage));
    };
    
    const schedule_types = createListCollection(
        { items: [{label: 'One-time', value: 'one-time'}, {label: 'Daily', value: 'daily'}, {label: 'Weekly', value: 'weekly'}, {label: 'Monthly', value: 'monthly'}, {label: 'Yearly', value: 'yearly'}] }
    )

    const hours = createListCollection({
        items: Array.from({ length: 24 }, (_, i) => ({
            label: i.toString().padStart(2, '0'),
            value: i
        }))
    });

    const minutes = createListCollection({
        items: Array.from({ length: 60 }, (_, i) => ({
            label: i.toString().padStart(2, '0'),
            value: i
        }))
    });

    const seconds = createListCollection({
        items: Array.from({ length: 60 }, (_, i) => ({
            label: i.toString().padStart(2, '0'),
            value: i
        }))
    });

    const days = createListCollection({
        items: Array.from({ length: 31 }, (_, i) => ({
            label: (i + 1).toString().padStart(2, '0'),
            value: i + 1
        }))
    });

    const months = createListCollection({
        items: Array.from({ length: 12 }, (_, i) => ({
            label: (i + 1).toString().padStart(2, '0'),
            value: i + 1
        }))
    });

    const daysOfWeek = createListCollection({
        items: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, i) => ({
            label: day,
            value: i
        }))
    });

    const handleSchedule = async () => {
        if (!monitoring_id || !scheduleType || webpagesToEval.length === 0) {
            console.error('Missing required fields for scheduling');
            return;
        }
        
        const postSchedule = async () => {
            const response = await addSchedule(
                scheduleType,
                monitoring_id,
                webpagesToEval,
                day >= 0 ? day : undefined,
                month >= 0 ? month : undefined,
                year >= 0 ? year : undefined,
                hour >= 0 ? hour : undefined,
                minute >= 0 ? minute : undefined,
                second >= 0 ? second : undefined,
                dayOfWeek >= 0 ? dayOfWeek : undefined
            );

            if (response === 200) {
                console.log('Schedule added successfully');
                setIsScheduled(true);
                regreshTrigger();
            }
        }
        
        postSchedule();
    }

    const hasWebpagesNeedingAuth = (): boolean => {
        return webpagesToEval.some(([, needs_authentication]) => needs_authentication );
    };
    
    const hiddenInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const hiddenInputSelectAllRef = useRef<HTMLElement | null>();
    const [selectAll, setSelectAll] = useState(false);

    return (
        <div className='schedule'>
            <DashboardMenu monitoring_id={String(monitoring_id)} />
            {monitoring_id ? (
                <div className='scheduler-container-wrapper'>
                    <WebsiteIdentifier monitoring_id={monitoring_id} />
                    <div className='schedule-container'>
                        <div className='evaluate-title-container'>
                            <Clock3 />
                            <h2>Scheduler</h2>
                        </div>
                        { !scheduleTrigger ? (
                            <div>
                                <Checkbox.Root className='checkbox-all-schedules' value='select-all' key='select-all'
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === ' ') {
                                            e.preventDefault();
                                            
                                            hiddenInputSelectAllRef.current?.click();
                                        }
                                    }}
                                    role='checkbox'
                                    aria-checked={selectAll}
                                    checked={webpagesToEval.length === collection.items.length}
                                    aria-label='Select all webpages'
                                >
                                    <Checkbox.HiddenInput className='checkbox-webpage-hidden-input' 
                                        ref={(el) => {
                                            hiddenInputSelectAllRef.current = el;
                                        }}
                                        onClick={() => {
                                            console.log('Checkbox clicked for select all');
                                            const newSelectAll = !selectAll;
                                            setSelectAll(newSelectAll);
                                            
                                            if (newSelectAll) {
                                                // If checking select all, select all
                                                const newWebpagesToEval: [string, boolean][] = [];
                                                collection.items.forEach(item => {
                                                    newWebpagesToEval.push([item.value, item.needs_authentication]);
                                                });
                                                setWebpagesToEval(newWebpagesToEval);
                                            } else {
                                                // If unchecking select all, deselect all
                                                setWebpagesToEval([]);
                                            }
                                        }}
                                        tabIndex={-1}
                                    />
                                    <Checkbox.Control className='checkbox-webpage-control'>
                                        <Checkbox.Indicator className='checkbox-webpage-indicator'>
                                            <CheckIcon />
                                        </Checkbox.Indicator>
                                    </Checkbox.Control>
                                    <Checkbox.Label className='checkbox-webpage-label'>Select all</Checkbox.Label>
                                </Checkbox.Root>
                                <Checkbox.Group 
                                    className='webpages-container' 
                                    name="framework" 
                                    value={webpagesToEval.map(webpage => webpage[0])} 
                                    onValueChange={(details) => {
                                        const selectedValues = Array.from(details.values());
                                        
                                        const newWebpagesToEval: [string, boolean][] = [];
                                        
                                        selectedValues.forEach(value => {
                                            const item = collection.items.find(item => item.value === value);
                                            if (item) {
                                                newWebpagesToEval.push([item.value, item.needs_authentication]);
                                            }
                                        });
                                        
                                        setWebpagesToEval(newWebpagesToEval);
                                    }}
                                >
                                    {collection.items.map((item) => (
                                        <div className='webpage-container' key={item.value}>
                                            <div className='checkbox-webpage-container'>
                                                <Checkbox.Root 
                                                    className='checkbox-webpage' 
                                                    value={item.value}
                                                    key={item.value} 
                                                    tabIndex={0}
                                                    onKeyDown={(e) => {
                                                        if (e.key === ' ') {
                                                            e.preventDefault();
                                                            
                                                            hiddenInputRefs.current[item.value]?.click();
                                                        }
                                                    }}
                                                    role='checkbox'
                                                    aria-checked={webpagesToEval.some(webpage => webpage[0] === item.value)} 
                                                >
                                                    <Checkbox.Control className='checkbox-webpage-control' onClick={() => {
                                                        const exists = webpagesToEval.some(([url]) => url === item.value);
        
                                                        if (exists) {
                                                            removeWebpage(item.value);
                                                            console.log("Removed:", item.value);
                                                        } else {
                                                            addWebpage([item.value, item.needs_authentication]);
                                                            console.log("Added:", item.value);
                                                        }
                                                    }}>
                                                        <Checkbox.Indicator className='checkbox-webpage-indicator'>
                                                            <CheckIcon />
                                                        </Checkbox.Indicator>
                                                    </Checkbox.Control>
                                                    <Checkbox.HiddenInput 
                                                        ref={(el) => {
                                                            hiddenInputRefs.current[item.value] = el;
                                                        }}
                                                        onClick={() => {
                                                            console.log('Checkbox clicked:', item.value);
                                                            setSelectAll(false);
                                                        }}
                                                        tabIndex={-1}
                                                    />
                                                    <div className="schduler-webpage-auth">
                                                        <Checkbox.Label className='checkbox-webpage-label'>{item.label}</Checkbox.Label>
                                                        {item.needs_authentication ? <KeyRound /> : null}
                                                    </div>
                                                </Checkbox.Root>
                                            </div>
                                        </div>
                                    ))}
                                </Checkbox.Group>
                            </div>
                        ) : (
                            <div className="schedule-content">
                                <div className="schedule-options">
                                    <div className="schedule-type">
                                        <SelectWidget 
                                            label="Schedule Type"
                                            placeholder="Select a Schedule Type"
                                            collection={schedule_types} 
                                            onValueChange={setScheduleType} 
                                        />
                                    </div>
                                    <div className='schedule-config'>
                                        { scheduleType === 'one-time' ? (
                                            <div className="one-time-options">
                                                <div className="schedule-date">
                                                    <DatePicker.Root onValueChange={(details) => {
                                                        if (details.value && details.value.length > 0) {
                                                            const selectedDate = details.value[0];
                                                            setDay(selectedDate.day);
                                                            setMonth(selectedDate.month);
                                                            setYear(selectedDate.year);
                                                        }
                                                    }}>
                                                        <DatePicker.Label className='date-picker-label'><strong>Pick a date *</strong></DatePicker.Label>
                                                        <DatePicker.Control className='date-picker-control'>
                                                            <DatePicker.Input className='date-picker-input' />
                                                            <DatePicker.Trigger className='date-picker-trigger'><Calendar /></DatePicker.Trigger>
                                                        </DatePicker.Control>
                                                        <Portal>
                                                            <DatePicker.Positioner className='date-picker-positioner'>
                                                                <DatePicker.Content className='date-picker-content'>
                                                                    <div className='date-picker-month-year'>
                                                                        <DatePicker.YearSelect />
                                                                        <DatePicker.MonthSelect />
                                                                    </div>
                                                                    <DatePicker.View view="day">
                                                                        <DatePicker.Context>
                                                                            {(datePicker) => (
                                                                            <>
                                                                                <DatePicker.ViewControl className='date-picker-view-control'>
                                                                                    <DatePicker.PrevTrigger className='date-picker-trigger' >Prev</DatePicker.PrevTrigger>
                                                                                    <DatePicker.ViewTrigger className='date-picker-trigger' >
                                                                                        <DatePicker.RangeText />
                                                                                    </DatePicker.ViewTrigger>
                                                                                    <DatePicker.NextTrigger className='date-picker-trigger' >Next</DatePicker.NextTrigger>
                                                                                </DatePicker.ViewControl>
                                                                                <DatePicker.Table className='date-picker-table'>
                                                                                    <DatePicker.TableHead className='date-picker-table-head'>
                                                                                        <DatePicker.TableRow className='date-picker-table-row'>
                                                                                            {datePicker.weekDays.map((weekDay, id) => (
                                                                                                <DatePicker.TableHeader key={id}>{weekDay.short}</DatePicker.TableHeader>
                                                                                            ))}
                                                                                        </DatePicker.TableRow>
                                                                                    </DatePicker.TableHead>
                                                                                    <DatePicker.TableBody>
                                                                                        {datePicker.weeks.map((week, id) => (
                                                                                        <DatePicker.TableRow key={id}>
                                                                                            {week.map((day, id) => (
                                                                                            <DatePicker.TableCell key={id} value={day}>
                                                                                                <DatePicker.TableCellTrigger className='date-picker-table-cell-trigger'>{day.day}</DatePicker.TableCellTrigger>
                                                                                            </DatePicker.TableCell>
                                                                                            ))}
                                                                                        </DatePicker.TableRow>
                                                                                        ))}
                                                                                    </DatePicker.TableBody>
                                                                                </DatePicker.Table>
                                                                            </>
                                                                            )}
                                                                        </DatePicker.Context>
                                                                    </DatePicker.View>
                                                                    <DatePicker.View view="month">
                                                                        <DatePicker.Context>
                                                                            {(datePicker) => (
                                                                            <>
                                                                                <DatePicker.ViewControl>
                                                                                    <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                                                                                    <DatePicker.ViewTrigger>
                                                                                        <DatePicker.RangeText />
                                                                                    </DatePicker.ViewTrigger>
                                                                                    <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                                                                                </DatePicker.ViewControl>
                                                                                <DatePicker.Table>
                                                                                    <DatePicker.TableBody>
                                                                                        {datePicker.getMonthsGrid({ columns: 4, format: 'short' }).map((months, id) => (
                                                                                            <DatePicker.TableRow key={id}>
                                                                                                {months.map((month, id) => (
                                                                                                    <DatePicker.TableCell key={id} value={month.value}>
                                                                                                        <DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
                                                                                                    </DatePicker.TableCell>
                                                                                                ))}
                                                                                            </DatePicker.TableRow>
                                                                                        ))}
                                                                                    </DatePicker.TableBody>
                                                                                </DatePicker.Table>
                                                                            </>
                                                                            )}
                                                                        </DatePicker.Context>
                                                                    </DatePicker.View>
                                                                    <DatePicker.View view="year">
                                                                        <DatePicker.Context>
                                                                            {(datePicker) => (
                                                                            <>
                                                                                <DatePicker.ViewControl>
                                                                                    <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                                                                                    <DatePicker.ViewTrigger>
                                                                                        <DatePicker.RangeText />
                                                                                    </DatePicker.ViewTrigger>
                                                                                    <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                                                                                </DatePicker.ViewControl>
                                                                                <DatePicker.Table>
                                                                                    <DatePicker.TableBody>
                                                                                        {datePicker.getYearsGrid({ columns: 4 }).map((years, id) => (
                                                                                        <DatePicker.TableRow key={id}>
                                                                                            {years.map((year, id) => (
                                                                                            <DatePicker.TableCell key={id} value={year.value}>
                                                                                                <DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
                                                                                            </DatePicker.TableCell>
                                                                                            ))}
                                                                                        </DatePicker.TableRow>
                                                                                        ))}
                                                                                    </DatePicker.TableBody>
                                                                                </DatePicker.Table>
                                                                            </>
                                                                            )}
                                                                        </DatePicker.Context>
                                                                    </DatePicker.View>
                                                                </DatePicker.Content>
                                                            </DatePicker.Positioner>
                                                        </Portal>
                                                    </DatePicker.Root>
                                                </div>
                                                <div className="schedule-time">
                                                    <div className="schedule-hour">
                                                        <SelectWidget 
                                                            label="Hour"
                                                            placeholder="Select an Hour"
                                                            collection={hours}
                                                            onValueChange={setHour}
                                                        />
                                                    </div>
                                                    <div className="schedule-minute">
                                                        <SelectWidget 
                                                            label="Minute"
                                                            placeholder="Select a Minute"
                                                            collection={minutes}
                                                            onValueChange={setMinute}
                                                        />
                                                    </div>
                                                    <div className="schedule-second">
                                                        <SelectWidget 
                                                            label="Second"
                                                            placeholder="Select a Second"
                                                            collection={seconds}
                                                            onValueChange={setSecond}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : scheduleType === 'daily' ? (
                                            <div className="daily-options">
                                                <div className="schedule-time">
                                                    <div className="daily-hour">
                                                        <SelectWidget 
                                                            label="Hour"
                                                            placeholder="Select an Hour"
                                                            collection={hours}
                                                            onValueChange={setHour}
                                                        />
                                                    </div>
                                                    <div className="daily-minute">
                                                    <SelectWidget 
                                                            label="Minute"
                                                            placeholder="Select a Minute"
                                                            collection={minutes}
                                                            onValueChange={setMinute}
                                                        />
                                                    </div>
                                                    <div className="daily-second">
                                                        <SelectWidget 
                                                            label="Second"
                                                            placeholder="Select a Second"
                                                            collection={seconds}
                                                            onValueChange={setSecond}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : scheduleType === 'weekly' ? (
                                            <div className="weekly-options">
                                                <div className="schedule-week-day">
                                                    <SelectWidget 
                                                        label="Day of Week"
                                                        placeholder="Select a Day of Week"
                                                        collection={daysOfWeek}
                                                        onValueChange={setDayOfWeek}
                                                    />
                                                </div>  
                                                <div className="schedule-time">
                                                    <div className="schedule-hour">
                                                        <SelectWidget 
                                                            label="Hour"
                                                            placeholder="Select an Hour"
                                                            collection={hours}
                                                            onValueChange={setHour}
                                                        />
                                                    </div>
                                                    <div className="schedule-minute">
                                                        <SelectWidget 
                                                            label="Minute"
                                                            placeholder="Select a Minute"
                                                            collection={minutes}
                                                            onValueChange={setMinute}
                                                        />
                                                    </div>
                                                    <div className="schedule-second">
                                                        <SelectWidget 
                                                            label="Second"
                                                            placeholder="Select a Second"
                                                            collection={seconds}
                                                            onValueChange={setSecond}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : scheduleType === 'monthly' ? (
                                            <div className="monthly-options">
                                                <div className="schedule-day-of-month">
                                                    <SelectWidget 
                                                        label="Day of Month"
                                                        placeholder="Select a Day of Month"
                                                        collection={days}
                                                        onValueChange={setDay}
                                                    />
                                                </div>
                                                <div className="schedule-time">
                                                    <div className="schedule-hour">
                                                        <SelectWidget 
                                                            label="Hour"
                                                            placeholder="Select an Hour"
                                                            collection={hours}
                                                            onValueChange={setHour}
                                                        />
                                                    </div>
                                                    <div className="schedule-minute">
                                                        <SelectWidget 
                                                            label="Minute"
                                                            placeholder="Select a Minute"
                                                            collection={minutes}
                                                            onValueChange={setMinute}
                                                        />
                                                    </div>
                                                    <div className="schedule-second">
                                                        <SelectWidget 
                                                            label="Second"
                                                            placeholder="Select a Second"
                                                            collection={seconds}
                                                            onValueChange={setSecond}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : scheduleType === 'yearly' ? (
                                            <div className="yearly-options">
                                                <div className="schedule-month">
                                                    <SelectWidget 
                                                        label="Month"
                                                        placeholder="Select a Month"
                                                        collection={months}
                                                        onValueChange={setMonth}
                                                    />
                                                </div>
                                                <div className="schedule-day-of-month">
                                                    <SelectWidget 
                                                        label="Day of Month"
                                                        placeholder="Select a Day of Month"
                                                        collection={days}
                                                        onValueChange={setDay}
                                                    />
                                                </div>
                                                <div className="schedule-time">
                                                    <div className="schedule-hour">
                                                        <SelectWidget 
                                                            label="Hour"
                                                            placeholder="Select an Hour"
                                                            collection={hours}
                                                            onValueChange={setHour}
                                                        />
                                                    </div>
                                                    <div className="schedule-minute">
                                                        <SelectWidget 
                                                            label="Minute"
                                                            placeholder="Select a Minute"
                                                            collection={minutes}
                                                            onValueChange={setMinute}
                                                        />
                                                    </div>
                                                    <div className="schedule-second">
                                                        <SelectWidget 
                                                            label="Second"
                                                            placeholder="Select a Second"
                                                            collection={seconds}
                                                            onValueChange={setSecond}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='evaluate-button-container'>
                            { !scheduleType ? (
                                <button className='evaluate-button' disabled={hasWebpagesNeedingAuth()} onClick={() => {
                                    if (webpagesToEval.length > 0) {
                                        setScheduleTrigger(true);
                                    }
                                }}>Next</button>
                            ) : (
                                <div className='schedule-button-container'>
                                    <button className='evaluate-button' onClick={() => {
                                        console.log("before add")
                                        console.log(webpagesToEval);
                                        handleSchedule();
                                    }}>
                                        Schedule
                                    </button>
                                    {isScheduled ? (
                                        <div className='schedule-check-container'>
                                            <CheckCheck />
                                        </div>
                                    ) : null}
                                </div>
                            )}
                            { webpagesToEval.some(([, auth]) => auth) && (<p className='webpage-auth-info' >Webpages that need prior authentication can not be scheduled!</p>)}
                        </div>
                    </div>
                    <SchedulesList monitoring_id={monitoring_id} refresh={refresh} onRefresh={regreshTrigger} />
                </div>
            ) : null}
        </div>
    );
}

export default Schedule;


function createMonitoredWebpagesCollection(monitoredWebpages: Webpage[]) {
    const items: { label: string, value: string, needs_authentication: boolean }[] = [];
    
    monitoredWebpages.forEach((webpage : Webpage) => {
        items.push({ 
            label: webpage.url, 
            value: webpage.id.toString(),
            needs_authentication: webpage.needs_authentication
        });
    });
    
    return items;
}