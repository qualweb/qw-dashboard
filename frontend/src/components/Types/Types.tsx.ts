export interface Result {
    id : number;
    description: string;
    code: string;
    location : string;
    url?: string;
}

export interface Test {
    id : number;
    description?: string;
    rule : string;
    results: Result[];
}

export interface TestCategory {
    tests: Test[];
} 
  
export interface WebsiteTestData {   
    passed: TestCategory;
    warnings: TestCategory;
    failed: TestCategory;
    inapplicable: TestCategory;
}
  
export interface EvaluationData {
    [url: string]: WebsiteTestData;
}

export interface TestData {
    [id: string]: Test;
}

export interface TestEvaluationData {
    passed: TestData;
    warnings: TestData;
    failed: TestData;
    inapplicable: TestData;
}