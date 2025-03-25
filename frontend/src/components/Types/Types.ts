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

export interface Assertion {
    id: number;
    passed: number;
    warning: number;
    failed: number;
    inapplicable: number;
    outcome: string;
    description: string;
    metadata: {
      id: number;
      code: string;
      name: string;
      description: string;
      url: string;
      mapping: string;
      targetElements: string[];
      targetAttributes: string[];
      successCriteria: {
        name: string;
        level: string;
        principle: string;
        url: string;
      }[];
      successCriteriaQuantity: number;
    };
    results: Results;
}

export interface InputItem {
    passed: Assertion[];
    warnings: Assertion[];
    failed: Assertion[];
    inapplicable: Assertion[];
}
  
export interface ResultDictionary {
    [url: string]: InputItem;
};

export interface Element {
    html_code: string;
    id: number;
    pointer: string;
}

export interface Issue {
    assertion_id: number;
    description: string;
    elements: Element[];
    id: number;
    result_code: string;
    verdict: 'passed' | 'warning' | 'failed' | 'inapplicable';
}

export interface Results {
    issues: Issue[];
}

export interface WebpageIssueResponse {
    url: string;
    assertions: AssertionsGroupedByOutcomeResponse;
}
  
export interface AssertionsGroupedByOutcomeResponse {
    passed: AssertionResponse[];
    warnings: AssertionResponse[];
    failed: AssertionResponse[];
    inapplicable: AssertionResponse[];
  }
  
export interface AssertionResponse {
    id: string | number;
    passed: boolean;
    warning: boolean;
    failed: boolean;
    inapplicable: boolean;
    outcome: string;
    description: string;
    metadata: AssertionMetadataResponse | null;
    issues: Issue[] | null;
}
  
export interface AssertionMetadataResponse {
    id: string | number;
    code: string;
    name: string;
    description: string;
    url: string;
    mapping: string;
    targetElements: string[];
    targetAttributes: string[];
    successCriteria: SuccessCriteriaResponse[];
    successCriteriaQuantity: number;
}
  
export interface SuccessCriteriaResponse {
    name: string;
    level: string;
    principle: string;
    url: string;
}
  
export interface IssueResponse {
    id: string | number;
    assertion_id: string | number;
    verdict: string;
    description: string;
    elements: IssueElementResponse[];
  }
  
export interface IssueElementResponse {
    id: string | number;
    html_code: string;
    pointer: string;
}