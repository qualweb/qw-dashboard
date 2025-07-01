import { useAuth0 } from '@auth0/auth0-react';

let MONITORING_API_URL: string;
const isProduction = import.meta.env.VITE_MODE === 'production';

if (isProduction) {
    MONITORING_API_URL = 'https://qwdashboard.di.fc.ul.pt/api/monitoring';
} else {
    MONITORING_API_URL = 'http://localhost:8081/api/monitoring';
}

interface RequestBody {
    webpage_ids: string[];
    username?: string;
    password?: string;
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

export const useMonitoringApi = () => {
    const authenticatedFetch = useAuthenticatedFetch();
    
    const runCrawler = async (
        website_name: string,
        url: string,
        is_mobile: boolean = false,
        is_landscape: boolean = true,
        display_width: number = 1920,
        display_height: number = 1080,
        user_id: number
    ) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/crawl`, {
            method: 'POST',
            body: JSON.stringify({
                website_name,
                url,
                is_mobile,
                is_landscape,
                display_width,
                display_height,
                user_id
            })
        });

        const data = await response.json();

        if (data && response.status === 200 && data['monitoring_registry_id']) {
            return data['monitoring_registry_id'];
        }

        throw new Error('It was not possible to crawl the website.');
    };

    const createMonitoringCycle = async (monitoring_registry_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/${monitoring_registry_id}/monitoring-cycle`, {
            method: 'POST',
        });

        if (response.status !== 200) {
            throw new Error('It was not possible to create a monitoring cycle.');
        }

        const data = await response.json();
        return data.monitoring_cycle_id;
    };

    const runEvaluation = async (
        monitoring_registry_id: string,
        webpage_ids: string[],
        needs_authentication: boolean[],
        username?: string,
        password?: string
    ) => {
        let requestBody: RequestBody = {
            webpage_ids: webpage_ids
        };
        
        if (needs_authentication.some(auth => auth === true)) {
            if (!username || !password) {
                throw new Error('Username and password are required for authenticated evaluations.');
            }
            
            requestBody = {
                ...requestBody,
                username: username,
                password: password
            };
        }

        const response = await authenticatedFetch(`${MONITORING_API_URL}/${monitoring_registry_id}/evaluate/`, {
            method: 'POST',
            body: JSON.stringify(requestBody)
        });
        
        if (response.status !== 200) {
            throw new Error('It was not possible to evaluate the website.');
        }

        const data = await response.json();
        return data;
    };

    const addLatestEvalsMonitoringCycle = async (monitoring_cycle_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/monitoring-cycle/${monitoring_cycle_id}/evaluations`, {
            method: 'POST',
        });

        if (response.status !== 200) {
            throw new Error('It was not possible to set the evaluations.');
        }
    };

    const calculateScores = async (monitoring_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/${monitoring_id}/calculate-score`, {
            method: 'POST',
        });

        if (response.status !== 200) {
            throw new Error('It was not possible to calculate the scores.');
        }
    };

    const getAccessibilityScore = async (monitoring_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/${monitoring_id}/score`);
        const data = await response.json();

        if (response.status !== 200) {
            throw new Error('Failed to fetch accessibility score.');
        }

        return data.score;
    };

    const getCurrentWarnings = async (monitoring_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/${monitoring_id}/current-warnings`);
        const data = await response.json();

        if (response.status !== 200) {
            throw new Error('Failed to fetch current warnings.');
        }

        return data.warnings;
    };

    const getIssuesStats = async (monitoring_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/${monitoring_id}/issues-stats`);
        const data = await response.json();

        if (response.status !== 200) {
            throw new Error('Failed to fetch issues stats.');
        }

        return data;
    };

    const getWebpageScreenshot = async (evaluation_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/evaluations/${evaluation_id}/webpage-screenshot`);
        const data = await response.blob();

        if (response.status !== 200) {
            throw new Error('Failed to fetch webpage screenshot.');
        }

        const url = URL.createObjectURL(data);
        return url;
    };

    const getLatestEvaluations = async (monitoring_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/${monitoring_id}/latest-evaluations`);
        const data = await response.json();

        if (response.status != 200) {
            throw new Error('Failed to fetch latest evaluations.');
        }

        return data.evaluations;
    };

    const getLatestAssertions = async (
        evaluation_id: string,
        moduleType: string,
        wcagGuidelinesFilters: string[],
        wcagLevelFilters: string[],
        outcome: string
    ) => {
        const response = await authenticatedFetch(
            `${MONITORING_API_URL}/evaluations/${evaluation_id}/latest-assertions?moduleType=${moduleType}&wcagGuidelinesFilters=${wcagGuidelinesFilters.join(',')}&wcagLevelFilters=${wcagLevelFilters.join(',')}&outcome=${outcome}`
        );
        const data = await response.json();

        if (response.status != 200) {
            throw new Error('Failed to fetch latest assertions.');
        }

        return data;
    };

    const getLatestAssertionsByTest = async (
        monitoring_id: string,
        moduleType: string,
        wcagGuidelinesFilters: string[],
        wcagLevelFilters: string[],
        outcome: string
    ) => {
        const response = await authenticatedFetch(
            `${MONITORING_API_URL}/${monitoring_id}/latest-assertions-by-test?moduleType=${moduleType}&wcagGuidelinesFilters=${wcagGuidelinesFilters.join(',')}&wcagLevelFilters=${wcagLevelFilters.join(',')}&outcome=${outcome}`
        );
        const data = await response.json();

        if (response.status != 200) {
            throw new Error('Failed to fetch latest assertions by test.');
        }

        return data;
    }

    const getAssertionResults = async (assertion_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/assertions/${assertion_id}/results`);
        const data = await response.json();

        if (response.status != 200) {
            throw new Error('Failed to fetch assertion results.');
        }

        return data.results;
    };

    const getResultElement = async (result_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/issues/${result_id}/elements`);
        const data = await response.json();

        if (response.status != 200) {
            throw new Error('Failed to fetch result elements.');
        }

        return data;
    };

    const getHistoryEvaluations = async (monitoring_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/${monitoring_id}/history`);
        const data = await response.json();

        if (response.status != 200) {
            throw new Error('Failed to fetch history.');
        }

        return data.history;
    };

    const getUserWebsites = async (user_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/${user_id}`);
        const data = await response.json();

        if (response.status !== 200) {
            throw new Error('Failed to fetch history.');
        }

        return data.monitoring_registries;
    };

    const getWebsiteMonitoringCycles = async (monitoring_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/${monitoring_id}/monitoring-cycles`);
        const data = await response.json();

        if (response.status != 200) {
            throw new Error('Failed to fetch evaluations.');
        }

        console.log(data);
        return data.monitoring_cycles;
    };

    const getMonitoredWebpages = async (monitoring_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/${monitoring_id}/monitored-webpages`);
        const data = await response.json();

        if (response.status !== 200) {
            throw new Error('Failed to fetch monitored webpages.');
        }

        return data.monitored_webpages;
    };

    const addWebpages = async (
        monitoring_id: string,
        webpages: string[],
        needs_authentication: boolean = false,
        username_field: string = '',
        password_field: string = '',
        login_button: string = ''
    ) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/${monitoring_id}/add-webpages`, {
            method: 'POST',
            body: JSON.stringify({
                urls: webpages,
                needs_authentication: needs_authentication,
                username_field_selector: username_field,
                password_field_selector: password_field,
                login_button_selector: login_button
            })
        });

        if (response.status != 200) {
            throw new Error('Failed to add webpages.');
        }
    };

    const deleteWebpage = async (webpage_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/webpage/${webpage_id}`, {
            method: 'DELETE',
        });

        if (response.status != 200) {
            throw new Error('Failed to delete webpage.');
        }
    };

    const getMonitoringRegistry = async (monitoring_id: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/${monitoring_id}/monitoring-registry`);
        const data = await response.json();

        if (response.status != 200) {
            throw new Error('Failed to fetch monitoring registry.');
        }

        return data.monitoring_registry;
    };

    const getWebsiteMonitoringCycle = async (cycle: string) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/monitoring-cycle/${cycle}`);
        const data = await response.json();

        if (response.status != 200) {
            throw new Error('Failed to fetch monitoring cycles.');
        }

        return data.monitoring_cycle;
    };

    const getWebpageComparisonData = async (
        webpage_id: string,
        first_cycle: string,
        second_cycle: string
    ) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/webpage/${webpage_id}/comparison/${first_cycle}/${second_cycle}`);
        const data = await response.json();

        if (response.status != 200) {
            throw new Error('Failed to fetch comparison data.');
        }

        return data;
    };

    const getFailedTestsStats = async (
        monitoring_id: string,
        first_cycle: string,
        second_cycle: string
    ) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/${monitoring_id}/comparison/${first_cycle}/${second_cycle}/failed-tests-stats`);
        const data = await response.json();

        if (response.status != 200) {
            throw new Error('Failed to fetch failed tests stats.');
        }

        return data;
    };

    const getAssertionsNumberByStateAndLevelPerWebpage = async (
        webpage_id: string,
        first_cycle: string,
        second_cycle: string,
        sc_level: string,
        state: string,
    ) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/webpage/${webpage_id}/assertions/${first_cycle}/${second_cycle}?sc_level=${sc_level}&state=${state}`);
        const data = await response.json();

        if (response.status != 200) {
            throw new Error('Failed to fetch assertions.');
        }

        return data;
    };

    const getChartData = async (
        webpage_id: string,
        fst_cycle_id: string,
        snd_cycle_id: string
    ) => {
        const response = await authenticatedFetch(`${MONITORING_API_URL}/webpage/${webpage_id}/comparison/${fst_cycle_id}/${snd_cycle_id}/chart-data`);
        const data = await response.json();

        if (response.status !== 200) {
            throw new Error('Failed to fetch chart data.');
        }

        return data;
    };

    return {
        runCrawler,
        createMonitoringCycle,
        runEvaluation,
        addLatestEvalsMonitoringCycle,
        calculateScores,
        getAccessibilityScore,
        getCurrentWarnings,
        getIssuesStats,
        getWebpageScreenshot,
        getLatestEvaluations,
        getLatestAssertions,
        getLatestAssertionsByTest,
        getAssertionResults,
        getResultElement,
        getHistoryEvaluations,
        getUserWebsites,
        getWebsiteMonitoringCycles,
        getMonitoredWebpages,
        addWebpages,
        deleteWebpage,
        getMonitoringRegistry,
        getWebsiteMonitoringCycle,
        getWebpageComparisonData,
        getFailedTestsStats,
        getAssertionsNumberByStateAndLevelPerWebpage,
        getChartData
    };
};

export const getWebsiteFavicon = async (url: string): Promise<string> => {
    const domain = new URL(url);
    const googleUrl = `https://www.google.com/s2/favicons?domain=${domain}`;
  
    const img = new Image();
    img.src = googleUrl;
    
    return new Promise((resolve) => {
        img.onload = () => resolve(googleUrl);
    });
};

export const getEventSource = (jobId: string) => {
    return new EventSource(`${MONITORING_API_URL}/job-progress/${jobId}`);
};
