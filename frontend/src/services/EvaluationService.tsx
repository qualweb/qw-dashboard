// const MONITORING_API_URL = 'http://10.10.6.132:8081/api/monitoring';

const MONITORING_API_URL = 'http://localhost:8081/api/monitoring';

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

export const runEvaluation = async (
    monitoring_registry_id : string,
    webpage_id : string
) => {
    const response_1 = await fetch(`${MONITORING_API_URL}/${monitoring_registry_id}/monitoring-cycle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response_1.status !== 200) {
        throw new Error('It was not possible to run the evaluation.');
    }

    const data = await response_1.json();

    const response_2 = await fetch(`${MONITORING_API_URL}/${monitoring_registry_id}/evaluate/${data.monitoring_cycle_id}/${webpage_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    
    if (response_2.status !== 200) {
        throw new Error('It was not possible to evaluate the website.');
    }
    
    const response_calculate = await fetch(`${MONITORING_API_URL}/${monitoring_registry_id}/calculate-score`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response_calculate.status !== 200) {
        throw new Error('It was not possible to evaluate the website.');
    }
}

export const getMonitoredWebsites = async () => {
    const response = await fetch(`${MONITORING_API_URL}/monitored-websites`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error('Failed to fetch evaluation data.');
    }

    return data.websites;
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

export const getLatestACTAssertions = async (
    evaluation_id: string,
    wcagLevelFilters: string[],
    outcome: string
) => {
    const assertions_response = await fetch(`${MONITORING_API_URL}/evaluations/${evaluation_id}/latest-act-assertions?wcagLevelFilters=${wcagLevelFilters.join(',')}&outcome=${outcome}`);
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

    return data;
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

    if(response.status != 200) {
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

    if(monitored_webpages_response.status != 200) {
        throw new Error('Failed to fetch monitored webpages.');
    }

    return data.monitored_webpages;
}

export const addWebpages = async(
    monitoring_id: string,
    webpages: string[]
) => {
    const response = await fetch(`${MONITORING_API_URL}/${monitoring_id}/add-webpages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            urls: webpages
        })
    });

    if(response.status != 200) {
        throw new Error('Failed to add webpages.');
    }
}