const SCHEDULER_API_URL = 'https://qwdashboard.di.fc.ul.pt:8083/api/scheduler';

export const addSchedule = async (
    schedule_type: string,
    monitoring_id: string,
    webpages_ids: [id: string, auth: boolean][],
    day?: number,
    month?: number,
    year?: number,
    hour?: number,
    minute?: number,
    second?: number,
    day_of_week?: number,
) => {
    const mappedWebpagesIds = webpages_ids.map(([id, ]) => { return Number(id) });

    const response = await fetch(`${SCHEDULER_API_URL}/add-schedule`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: 
        JSON.stringify({
            schedule_type: schedule_type,
            monitoring_id: monitoring_id,
            webpages_ids: mappedWebpagesIds,
            day: day,
            month: month,
            year: year,
            hour: hour,
            minute: minute,
            second: second,
            day_of_week: day_of_week
        }),
    });

    if (!response.ok) {
        throw new Error(`Error adding schedule: ${response.statusText}`);
    }

    return 200;
};

export const getSchedules = async (
    monitoring_id?: string
) => {
    const response = await fetch(`${SCHEDULER_API_URL}/${monitoring_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching schedules: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
}

export const getSchedule = async (
    schedule_id: string
) => {
    const response = await fetch(`${SCHEDULER_API_URL}/schedules/${schedule_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching schedule: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
}

export const deleteSchedule = async (
    schedule_id: string
) => {
    const response = await fetch(`${SCHEDULER_API_URL}/${schedule_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error deleting schedule: ${response.statusText}`);
    }

    return 200;
}