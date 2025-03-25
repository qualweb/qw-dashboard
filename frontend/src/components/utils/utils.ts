import { SuccessCriteriaResponse } from "../Types/Types";

export function getCategory(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

export function getSuccessCriteriaLevels(successCriteria: SuccessCriteriaResponse[]) {
    const result : string[] = [];

    if (successCriteria) {
        successCriteria.map((criteria: SuccessCriteriaResponse) => result.push(criteria.level));
    }

    return result;
}