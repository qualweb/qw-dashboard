import { useAuth0 } from '@auth0/auth0-react';

let SCHEDULER_API_URL: string;
const isProduction = import.meta.env.VITE_MODE === 'production';
if (isProduction) {
    SCHEDULER_API_URL = 'https://qwdashboard.di.fc.ul.pt/api/scheduler';
} else {
    SCHEDULER_API_URL = 'http://localhost:8083/api/scheduler';
}

export const useAuthenticatedFetch = () => {
    const { getAccessTokenSilently } = useAuth0();
    
    return async (url: string, options: RequestInit = {}): Promise<Response> => {
        const token = await getAccessTokenSilently();
        
        const authHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        };

        const response = await fetch(url, {
            ...options,
            headers: authHeaders,
        });

        if (response.status === 401) {
            throw new Error('Authentication required. Please log in.');
        }
        if (response.status === 403) {
            throw new Error('Access forbidden. Insufficient permissions.');
        }

        return response;
    };
};

export const useSchedulerApi = () => {
    const authenticatedFetch = useAuthenticatedFetch();
    
    const addSchedule = async (
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
        
        const response = await authenticatedFetch(`${SCHEDULER_API_URL}/add-schedule`, {
            method: 'POST',
            body: JSON.stringify({
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

    const getSchedules = async (monitoring_id?: string) => {
        const response = await authenticatedFetch(`${SCHEDULER_API_URL}/${monitoring_id}`, {
            method: 'GET',
        });
        
        if (!response.ok) {
            throw new Error(`Error fetching schedules: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    };

    const getSchedule = async (schedule_id: string) => {
        const response = await authenticatedFetch(`${SCHEDULER_API_URL}/schedules/${schedule_id}`, {
            method: 'GET',
        });
        
        if (!response.ok) {
            throw new Error(`Error fetching schedule: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    };

    const deleteSchedule = async (schedule_id: string) => {
        const response = await authenticatedFetch(`${SCHEDULER_API_URL}/${schedule_id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error(`Error deleting schedule: ${response.statusText}`);
        }
        return 200;
    };

    return {
        addSchedule,
        getSchedules,
        getSchedule,
        deleteSchedule
    };
};