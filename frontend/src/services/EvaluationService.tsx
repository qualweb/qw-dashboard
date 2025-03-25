const EVALUATIONS_API_URL = 'http://localhost:8081/api/evaluations';

export const runCrawler = async (
    url : string,
    is_mobile : boolean = false,
    is_landscape : boolean = true,
    display_width : number = 1920,
    display_height : number = 1080
) => {
    const response = await fetch(`${EVALUATIONS_API_URL}/crawl`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url,
            is_mobile,
            is_landscape,
            display_width,
            display_height
        })
    });

    const data = await response.json();

    if (data && response.status === 200 && data['monitoring_registry_id']) {
        return data['monitoring_registry_id'];
    }

    throw new Error('It was not possible to crawl the website.');
};

export const runEvaluation = async (
    monitoring_registry_id : string
) => {
    const response = await fetch(`${EVALUATIONS_API_URL}/evaluate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            monitoring_registry_id
        })
    });

    if (response.status !== 200) {
        throw new Error('It was not possible to evaluate the website.');
    }
}

export const getEvaluationsData = async (
    monitoring_id : string
) => {
    const response = await fetch(`${EVALUATIONS_API_URL}/monitoring/${monitoring_id}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error('Failed to fetch evaluation data.');
    }

    return data;
}

export const getCurrentIssuesByWebpage = async (
    monitoring_id : string
) => {
    const assertions_response = await fetch(`${EVALUATIONS_API_URL}/monitoring/${monitoring_id}/latest-assertions/by-webpage`);
    
    const assertions_data = await assertions_response.json();

    if (assertions_response.status !== 200) {
        throw new Error('Failed to fetch current issues.');
    }

    console.log(assertions_data);
    
    return assertions_data;
}

export const getCurrentIssuesByTest = async (
    monitoring_id : string
) => {
    const assertions_response = await fetch(`${EVALUATIONS_API_URL}/monitoring/${monitoring_id}/latest-assertions/by-test`);
    
    const assertions_data = await assertions_response.json();

    if (assertions_response.status !== 200) {
        throw new Error('Failed to fetch current issues.');
    }

    return assertions_data;
}