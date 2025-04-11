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

export function getTimeDiff(day: number, month: number, year: number): string {
    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    
    inputDate.setHours(0, 0, 0, 0);
    const todayMidnight = new Date(currentDate);
    todayMidnight.setHours(0, 0, 0, 0);
    
    const diffTime = todayMidnight.getTime() - inputDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) 
        return "Today";
    
    if (diffDays === 1) 
        return "Yesterday";
    
    if (diffDays > 1 && diffDays <= 7) 
        return `${diffDays} days ago`;
    
    if (diffDays > 7 && diffDays <= 14) 
        return "Last week";
    
    const monthDiff = (currentDate.getFullYear() - inputDate.getFullYear()) * 12 + (currentDate.getMonth() - inputDate.getMonth());
    
    if (monthDiff === 1) 
        return "Last month";

    if (monthDiff > 1 && monthDiff < 12) 
        return `${monthDiff} months ago`;
    
    const yearDiff = currentDate.getFullYear() - inputDate.getFullYear();
    
    if (yearDiff === 1) 
        return "1 year ago";
    
    if (yearDiff > 1) 
        return `${yearDiff} years ago`;
    
    return `${diffDays} days ago`;
}