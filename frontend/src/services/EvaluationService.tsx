// const MONITORING_API_URL = 'http://10.10.6.132:8081/api/monitoring';

const MONITORING_API_URL = '10.10.2.116:8081/api/monitoring';

export const runCrawler = async (
    website_name : string,
    url : string,
    is_mobile : boolean = false,
    is_landscape : boolean = true,
    display_width : number = 1920,
    display_height : number = 1080,
    user_id: number
) => {
    const response = await fetch(`${MONITORING_API_URL}/crawl`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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

export const createMonitoringCycle = async (
    monitoring_registry_id : string
) => {
    const response = await fetch(`${MONITORING_API_URL}/${monitoring_registry_id}/monitoring-cycle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error('It was not possible to create a monitoring cycle.');
    }

    const data = await response.json();

    return data.monitoring_cycle_id;
}

interface RequestBody {
    webpage_ids: string[];
    username?: string;
    password?: string;
}

export const runEvaluation = async (
    monitoring_registry_id : string,
    webpage_ids : string[],
    needs_authentication : boolean[],
    username ?: string,
    password ?: string
) => {
    let requestBody : RequestBody = {
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

    const response_2 = await fetch(`${MONITORING_API_URL}/${monitoring_registry_id}/evaluate/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
    
    if (response_2.status !== 200) {
        throw new Error('It was not possible to evaluate the website.');
    }
}

export const addLatestEvalsMonitoringCycle = async (
    monitoring_cycle_id : string
) => {
    const response = await fetch(`${MONITORING_API_URL}/monitoring-cycle/${monitoring_cycle_id}/evaluations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error('It was not possible to set the evaluations.');
    }
}

export const calculateScores = async (
    monitoring_id : string
) => {
    const response = await fetch(`${MONITORING_API_URL}/${monitoring_id}/calculate-score`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error('It was not possible to calculate the scores.');
    }
}

export const getAccessibilityScore = async (
    monitoring_id : string
) => {
    const score_response = await fetch(`${MONITORING_API_URL}/${monitoring_id}/score`);
    const data = await score_response.json();

    if (score_response.status !== 200) {
        throw new Error('Failed to fetch accessibility score.');
    }

    return data.score;
}

export const getCurrentWarnings = async (
    monitoring_id : string
) => {
    const warnings_response = await fetch(`${MONITORING_API_URL}/${monitoring_id}/current-warnings`);
    const data = await warnings_response.json();

    if (warnings_response.status !== 200) {
        throw new Error('Failed to fetch current warnings.');
    }

    return data.warnings;
}

export const getIssuesStats = async (
    monitoring_id : string
) => {
    const stats_response = await fetch(`${MONITORING_API_URL}/${monitoring_id}/issues-stats`);
    const data = await stats_response.json();

    if (stats_response.status !== 200) {
        throw new Error('Failed to fetch issues stats.');
    }

    return data;
}

export const getWebpageScreenshot = async (
    evaluation_id : string
) => {
    const screenshot_response = await fetch(`${MONITORING_API_URL}/evaluations/${evaluation_id}/webpage-screenshot`);
    const data = await screenshot_response.blob();

    if (screenshot_response.status !== 200) {
        throw new Error('Failed to fetch webpage screenshot.');
    }

    const url = URL.createObjectURL(data);

    return url;
}

export const getLatestEvaluations = async (
    monitoring_id: string
) => {
    const evaluations_response = await fetch(`${MONITORING_API_URL}/${monitoring_id}/latest-evaluations`);
    const data = await evaluations_response.json();

    if(evaluations_response.status != 200) {
        throw new Error('Failed to fetch latest evaluations.');
    }

    return data.evaluations;
}

export const getLatestAssertions = async (
    evaluation_id: string,
    moduleType: string,
    wcagGuidelinesFilters: string[],
    wcagLevelFilters: string[],
    outcome: string
) => {
    const assertions_response = await fetch(`${MONITORING_API_URL}/evaluations/${evaluation_id}/latest-assertions?moduleType=${moduleType}&wcagGuidelinesFilters=${wcagGuidelinesFilters.join(',')}&wcagLevelFilters=${wcagLevelFilters.join(',')}&outcome=${outcome}`);
    const data = await assertions_response.json();

    if(assertions_response.status != 200) {
        throw new Error('Failed to fetch latest assertions.');
    }

    return data;
}

export const getAssertionResults = async (
    assertion_id: string
) => {
    const results_response = await fetch(`${MONITORING_API_URL}/assertions/${assertion_id}/results`);
    const data = await results_response.json();

    if(results_response.status != 200) {
        throw new Error('Failed to fetch assertion results.');
    }

    return data.results;
}

export const getResultElement = async (
    result_id: string
) => {
    const elements_response = await fetch(`${MONITORING_API_URL}/issues/${result_id}/elements`);
    const data = await elements_response.json();

    if(elements_response.status != 200) {
        throw new Error('Failed to fetch result elements.');
    }

    return data;
}

export const getHistoryEvaluations = async (
    monitoring_id: string
) => {
    const evaluations_response = await fetch(`${MONITORING_API_URL}/${monitoring_id}/history`);
    const data = await evaluations_response.json();

    if(evaluations_response.status != 200) {
        throw new Error('Failed to fetch history.');
    }

    return data.history;
}

export const getUserWebsites = async(
    user_id: string
) => {
    const response = await fetch(`${MONITORING_API_URL}/${user_id}`);
    const data = await response.json();

    if(response.status !== 200) {
        throw new Error('Failed to fetch history.');
    }

    return data.monitoring_registries;
}

export const getWebsiteFavicon = async(
    url: string
) : Promise<string> => {
    const domain = new URL(url);

    const googleUrl = `https://www.google.com/s2/favicons?domain=${domain}`;
  
    const img = new Image();
    img.src = googleUrl;
    
    return new Promise((resolve) => {
        img.onload = () => resolve(googleUrl);;
    });
}

export const getWebsiteMonitoringCycles = async(
    monitoring_id: string
) => {
    const evaluation_cycles_response = await fetch(`${MONITORING_API_URL}/${monitoring_id}/monitoring-cycles`);
    const data = await evaluation_cycles_response.json();

    if(evaluation_cycles_response.status != 200) {
        throw new Error('Failed to fetch evaluations.');
    }

    console.log(data);

    return data.monitoring_cycles;
}

export const getMonitoredWebpages = async(
    monitoring_id: string
) => {
    const monitored_webpages_response = await fetch(`${MONITORING_API_URL}/${monitoring_id}/monitored-webpages`);
    const data = await monitored_webpages_response.json();

    if(monitored_webpages_response.status !== 200) {
        throw new Error('Failed to fetch monitored webpages.');
    }

    return data.monitored_webpages;
}

export const addWebpages = async(
    monitoring_id: string,
    webpages: string[],
    needs_authentication: boolean = false,
    username_field: string = '',
    password_field: string = '',
    login_button: string = ''
) => {
    const response = await fetch(`${MONITORING_API_URL}/${monitoring_id}/add-webpages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            urls: webpages,
            needs_authentication: needs_authentication,
            username_field_selector: username_field,
            password_field_selector: password_field,
            login_button_selector: login_button
        })
    });

    if(response.status != 200) {
        throw new Error('Failed to add webpages.');
    }
}

export const deleteWebpage = async(
    webpage_id: string
) => {
    const response = await fetch(`${MONITORING_API_URL}/webpage/${webpage_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.status != 200) {
        throw new Error('Failed to delete webpage.');
    }
}

export const getMonitoringRegistry = async(
    monitoring_id: string
) => {
    const monitoring_registry_response = await fetch(`${MONITORING_API_URL}/${monitoring_id}/monitoring-registry`);
    const data = await monitoring_registry_response.json();

    if(monitoring_registry_response.status != 200) {
        throw new Error('Failed to fetch monitoring registry.');
    }

    return data.monitoring_registry;
}

export const getWebsiteMonitoringCycle = async(
    cycle: string
) => {
    const monitoring_cycles_response = await fetch(`${MONITORING_API_URL}/monitoring-cycle/${cycle}`);
    const data = await monitoring_cycles_response.json();

    if(monitoring_cycles_response.status != 200) {
        throw new Error('Failed to fetch monitoring cycles.');
    }

    return data.monitoring_cycle;
}

export const getWebpageComparisonData = async(
    webpage_id: string,
    first_cycle: string,
    second_cycle: string
) => {
    const comparison_response = await fetch(`${MONITORING_API_URL}/webpage/${webpage_id}/comparison/${first_cycle}/${second_cycle}`);
    const data = await comparison_response.json();

    if(comparison_response.status != 200) {
        throw new Error('Failed to fetch comparison data.');
    }

    return data;
}

export const getFailedTestsStats = async(
    monitoring_id: string,
    first_cycle: string,
    second_cycle: string
) => {
    const failed_tests_response = await fetch(`${MONITORING_API_URL}/${monitoring_id}/comparison/${first_cycle}/${second_cycle}/failed-tests-stats`);
    const data = await failed_tests_response.json();

    if(failed_tests_response.status != 200) {
        throw new Error('Failed to fetch failed tests stats.');
    }

    return data;
}

export const getAssertionsNumberByStateAndLevelPerWebpage = async(
    webpage_id: string,
    first_cycle: string,
    second_cycle: string,
    sc_level: string,
    state: string,
) => {
    const assertions_response = await fetch(`${MONITORING_API_URL}/webpage/${webpage_id}/assertions/${first_cycle}/${second_cycle}?sc_level=${sc_level}&state=${state}`);
    const data = await assertions_response.json();

    if(assertions_response.status != 200) {
        throw new Error('Failed to fetch assertions.');
    }

    return data;
}

export const getChartData = async (
    webpage_id: string,
    fst_cycle_id: string,
    snd_cycle_id: string
) => {
    const response = await fetch(`${MONITORING_API_URL}/webpage/${webpage_id}/comparison/${fst_cycle_id}/${snd_cycle_id}/chart-data`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error('Failed to fetch chart data.');
    }

    return data;
}