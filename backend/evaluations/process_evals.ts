import { EvaluationReport, ModuleType, QualwebReport, Assertion as QualwebAssertion, SuccessCriteria as QualwebSuccessCriteria, TestResult, EvaluationElement } from "@qualweb/core";
import { Assertion, AssertionMetadata, Module, Result, SuccessCriteria, Element } from "./protobuf_library/evaluations_pb";
import puppeteer, { ElementHandle, Page } from 'puppeteer';

export default async function getModules(report : QualwebReport, page : Page) : Promise<Module[]> {
    var modules : Module[] = [];
    const modules_names : ModuleType[] = [ModuleType.WCAG_TECHNIQUES, ModuleType.ACT_RULES, ModuleType.BEST_PRACTICES];
    const assertions_quantity : number[] = [35, 77, 29];

    var i = 0;

    for(const module of modules_names) {
        var new_module = new Module();

        if (report.modules[module] !== undefined) {
            const currentModule : EvaluationReport = report.modules[module] as EvaluationReport;

            new_module.setType(currentModule.type);
            new_module.setPassed(currentModule.metadata.passed);
            new_module.setWarning(currentModule.metadata.warning);
            new_module.setFailed(currentModule.metadata.failed);
            new_module.setInapplicable(currentModule.metadata.inapplicable);

            const assertions = await getAssertions(currentModule, assertions_quantity[i], page)
            new_module.setAssertionsList(assertions[0]);
            new_module.setAssertionsQuantity(assertions[1]);

            modules.push(new_module);
            i++;
        }
        else {
            console.error("Module not found!");
        }
    }

    return modules;
}

async function getAssertions(module : EvaluationReport, assertions_quantity : number, page : Page) : Promise<[Assertion[], number]> {
    var assertions : Assertion[] = [];
    var rule_prefix = '';
    var counter = 0;

    switch(module.type) {
        case ModuleType.WCAG_TECHNIQUES:
            rule_prefix = 'QW-WCAG-T';
            break;
        case ModuleType.ACT_RULES:
            rule_prefix = 'QW-ACT-R';
            break;
        case ModuleType.BEST_PRACTICES:
            rule_prefix = 'QW-BP';
        break;
        default:
            break;
    }

    for(var i = 1; i <= assertions_quantity; i++) {
        var new_assertion = new Assertion();
        const assertion = module.assertions[rule_prefix.concat(i.toString())];
        
        if(module.assertions[rule_prefix.concat(i.toString())] !== undefined) {
            new_assertion.setPassed(assertion.metadata.passed);
            new_assertion.setWarning(assertion.metadata.warning);
            new_assertion.setFailed(assertion.metadata.failed);
            new_assertion.setInapplicable(assertion.metadata.inapplicable);
            new_assertion.setOutcome(assertion.metadata.outcome);
            new_assertion.setDescription(assertion.metadata.description);
            new_assertion.setMetadata(await getMetadata(assertion, page));

            assertions.push(new_assertion);
            counter++;
        }
    }

    return [assertions, counter]
}

async function getMetadata(assertion : QualwebAssertion, page : Page) : Promise<AssertionMetadata> {
    var assertion_metadata = new AssertionMetadata();

    assertion_metadata.setCode(assertion.code);
    assertion_metadata.setName(assertion.name);
    assertion_metadata.setDescription(assertion.description);
    assertion_metadata.setUrl(assertion.metadata.url);
    assertion_metadata.setMapping(assertion.mapping);

    if(assertion.metadata.target.element !== undefined) {
        if(typeof assertion.metadata.target.element === 'string' ) {
            assertion_metadata.setTargetElementsList([assertion.metadata.target.element])
        }
        else {
            assertion_metadata.setTargetElementsList(assertion.metadata.target.element)
        }
    }

    if(assertion.metadata.target.attributes !== undefined) {
        if(typeof assertion.metadata.target.attributes === 'string' ) {
            assertion_metadata.setTargetAttributesList([assertion.metadata.target.attributes])
        }
        else {
            assertion_metadata.setTargetAttributesList(assertion.metadata.target.attributes)
        }
    }

    assertion_metadata.setSuccessCriteriaList(getSuccessCriteriaList(assertion));
    assertion_metadata.setSuccessCriteriaQuantity(assertion.metadata['success-criteria'].length);

    const results = await getResults(assertion, page)
    assertion_metadata.setResultsList(results[0]);
    assertion_metadata.setResultsQuantity(results[1]);

    return assertion_metadata;
}

function getSuccessCriteriaList(assertion : QualwebAssertion) : SuccessCriteria[] {
    var success_criteria_list : SuccessCriteria[] = [];

    assertion.metadata['success-criteria'].forEach((success_criteria : QualwebSuccessCriteria) => {
        var new_success_criteria = new SuccessCriteria();

        new_success_criteria.setName(success_criteria.name);
        new_success_criteria.setLevel(success_criteria.level);
        new_success_criteria.setPrinciple(success_criteria.principle);
        new_success_criteria.setUrl(success_criteria.url);

        success_criteria_list.push(new_success_criteria);
    });

    return success_criteria_list;
}

async function getResults(assertion : QualwebAssertion, page : Page) : Promise<[Result[], number]> {
    var results : Result[] = [];
    var results_counter : number = 0;

    for(const result of assertion.results) {
        var new_result = new Result();

        var elements : Element[] = [];
        var elements_counter : number = 0;

        new_result.setVerdict(result.verdict);
        new_result.setDescription(result.description);
    
        for(const element of result.elements) {
            var new_element = new Element();
            
            if (element.htmlCode !== undefined)
                new_element.setHtmlCode(element.htmlCode);

            if (element.pointer !== undefined) {
                new_element.setPointer(element.pointer);

                const getElementPosDim = async (pointer : string) => {
                    const element = await page.waitForSelector(pointer);

                    if (!element) {
                        console.error(`Element not found for pointer: ${pointer}`);
                        return;
                    }

                    const bounding_box = await element.boundingBox();
                    
                    if (!bounding_box) {
                        console.error(`Bounding box not found for pointer: ${pointer}`);
                        return;
                    }

                    new_element.setX(bounding_box.x);
                    new_element.setY(bounding_box.y);
                    new_element.setWidth(bounding_box.width);
                    new_element.setHeight(bounding_box.height);
                }

                await getElementPosDim(element.pointer);
            }

            elements.push(new_element);
            elements_counter++;
        }

        new_result.setResultCode(result.resultCode);

        new_result.setElementsList(elements);
        new_result.setElementsQuantity(elements_counter);
        
        results.push(new_result);
        results_counter++;
    }

    return  [results, results_counter];
}

export async function takeWebpageScreenshot(webpage_url: string, width: number, height: number) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });

    try {
        const page = await browser.newPage();

        await page.goto(webpage_url, { waitUntil: 'domcontentloaded' });
        
        await page.setViewport({
            width: width,
            height: height,
            deviceScaleFactor: 1,
        });
        
        const screenshot = await page.screenshot({ 
            fullPage: true
        });
        
        return screenshot;
    } catch (error) {
        console.error('Error taking screenshot:', error);
        return null;
    } finally {
        await browser.close();
    }
}