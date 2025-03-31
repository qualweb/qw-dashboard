// package: runtimePackage
// file: evaluations.proto

import * as jspb from "google-protobuf";

export class Element extends jspb.Message {
  getHtmlCode(): string;
  setHtmlCode(value: string): void;

  getPointer(): string;
  setPointer(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Element.AsObject;
  static toObject(includeInstance: boolean, msg: Element): Element.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Element, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Element;
  static deserializeBinaryFromReader(message: Element, reader: jspb.BinaryReader): Element;
}

export namespace Element {
  export type AsObject = {
    htmlCode: string,
    pointer: string,
  }
}

export class Result extends jspb.Message {
  getVerdict(): string;
  setVerdict(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  clearElementsList(): void;
  getElementsList(): Array<Element>;
  setElementsList(value: Array<Element>): void;
  addElements(value?: Element, index?: number): Element;

  getElementsQuantity(): number;
  setElementsQuantity(value: number): void;

  getResultCode(): string;
  setResultCode(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Result.AsObject;
  static toObject(includeInstance: boolean, msg: Result): Result.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Result, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Result;
  static deserializeBinaryFromReader(message: Result, reader: jspb.BinaryReader): Result;
}

export namespace Result {
  export type AsObject = {
    verdict: string,
    description: string,
    elementsList: Array<Element.AsObject>,
    elementsQuantity: number,
    resultCode: string,
  }
}

export class SuccessCriteria extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getLevel(): string;
  setLevel(value: string): void;

  getPrinciple(): string;
  setPrinciple(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SuccessCriteria.AsObject;
  static toObject(includeInstance: boolean, msg: SuccessCriteria): SuccessCriteria.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SuccessCriteria, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SuccessCriteria;
  static deserializeBinaryFromReader(message: SuccessCriteria, reader: jspb.BinaryReader): SuccessCriteria;
}

export namespace SuccessCriteria {
  export type AsObject = {
    name: string,
    level: string,
    principle: string,
    url: string,
  }
}

export class AssertionMetadata extends jspb.Message {
  getCode(): string;
  setCode(value: string): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  getMapping(): string;
  setMapping(value: string): void;

  clearTargetElementsList(): void;
  getTargetElementsList(): Array<string>;
  setTargetElementsList(value: Array<string>): void;
  addTargetElements(value: string, index?: number): string;

  clearTargetAttributesList(): void;
  getTargetAttributesList(): Array<string>;
  setTargetAttributesList(value: Array<string>): void;
  addTargetAttributes(value: string, index?: number): string;

  clearSuccessCriteriaList(): void;
  getSuccessCriteriaList(): Array<SuccessCriteria>;
  setSuccessCriteriaList(value: Array<SuccessCriteria>): void;
  addSuccessCriteria(value?: SuccessCriteria, index?: number): SuccessCriteria;

  getSuccessCriteriaQuantity(): number;
  setSuccessCriteriaQuantity(value: number): void;

  clearResultsList(): void;
  getResultsList(): Array<Result>;
  setResultsList(value: Array<Result>): void;
  addResults(value?: Result, index?: number): Result;

  getResultsQuantity(): number;
  setResultsQuantity(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AssertionMetadata.AsObject;
  static toObject(includeInstance: boolean, msg: AssertionMetadata): AssertionMetadata.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AssertionMetadata, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AssertionMetadata;
  static deserializeBinaryFromReader(message: AssertionMetadata, reader: jspb.BinaryReader): AssertionMetadata;
}

export namespace AssertionMetadata {
  export type AsObject = {
    code: string,
    name: string,
    description: string,
    url: string,
    mapping: string,
    targetElementsList: Array<string>,
    targetAttributesList: Array<string>,
    successCriteriaList: Array<SuccessCriteria.AsObject>,
    successCriteriaQuantity: number,
    resultsList: Array<Result.AsObject>,
    resultsQuantity: number,
  }
}

export class Assertion extends jspb.Message {
  getPassed(): number;
  setPassed(value: number): void;

  getWarning(): number;
  setWarning(value: number): void;

  getFailed(): number;
  setFailed(value: number): void;

  getInapplicable(): number;
  setInapplicable(value: number): void;

  getOutcome(): string;
  setOutcome(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  hasMetadata(): boolean;
  clearMetadata(): void;
  getMetadata(): AssertionMetadata | undefined;
  setMetadata(value?: AssertionMetadata): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Assertion.AsObject;
  static toObject(includeInstance: boolean, msg: Assertion): Assertion.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Assertion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Assertion;
  static deserializeBinaryFromReader(message: Assertion, reader: jspb.BinaryReader): Assertion;
}

export namespace Assertion {
  export type AsObject = {
    passed: number,
    warning: number,
    failed: number,
    inapplicable: number,
    outcome: string,
    description: string,
    metadata?: AssertionMetadata.AsObject,
  }
}

export class Module extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getPassed(): number;
  setPassed(value: number): void;

  getWarning(): number;
  setWarning(value: number): void;

  getFailed(): number;
  setFailed(value: number): void;

  getInapplicable(): number;
  setInapplicable(value: number): void;

  clearAssertionsList(): void;
  getAssertionsList(): Array<Assertion>;
  setAssertionsList(value: Array<Assertion>): void;
  addAssertions(value?: Assertion, index?: number): Assertion;

  getAssertionsQuantity(): number;
  setAssertionsQuantity(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Module.AsObject;
  static toObject(includeInstance: boolean, msg: Module): Module.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Module, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Module;
  static deserializeBinaryFromReader(message: Module, reader: jspb.BinaryReader): Module;
}

export namespace Module {
  export type AsObject = {
    type: string,
    passed: number,
    warning: number,
    failed: number,
    inapplicable: number,
    assertionsList: Array<Assertion.AsObject>,
    assertionsQuantity: number,
  }
}

export class AddEvaluationRequest extends jspb.Message {
  getQualwebVersion(): string;
  setQualwebVersion(value: string): void;

  getInputUrl(): string;
  setInputUrl(value: string): void;

  getCompleteUrl(): string;
  setCompleteUrl(value: string): void;

  getDom(): string;
  setDom(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getElementCount(): number;
  setElementCount(value: number): void;

  getPassed(): number;
  setPassed(value: number): void;

  getWarning(): number;
  setWarning(value: number): void;

  getFailed(): number;
  setFailed(value: number): void;

  getInapplicable(): number;
  setInapplicable(value: number): void;

  clearModulesList(): void;
  getModulesList(): Array<Module>;
  setModulesList(value: Array<Module>): void;
  addModules(value?: Module, index?: number): Module;

  getModulesQuantity(): number;
  setModulesQuantity(value: number): void;

  getMonitoredWebsiteId(): number;
  setMonitoredWebsiteId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddEvaluationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddEvaluationRequest): AddEvaluationRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddEvaluationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddEvaluationRequest;
  static deserializeBinaryFromReader(message: AddEvaluationRequest, reader: jspb.BinaryReader): AddEvaluationRequest;
}

export namespace AddEvaluationRequest {
  export type AsObject = {
    qualwebVersion: string,
    inputUrl: string,
    completeUrl: string,
    dom: string,
    title: string,
    elementCount: number,
    passed: number,
    warning: number,
    failed: number,
    inapplicable: number,
    modulesList: Array<Module.AsObject>,
    modulesQuantity: number,
    monitoredWebsiteId: number,
  }
}

export class AddEvaluationResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddEvaluationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddEvaluationResponse): AddEvaluationResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddEvaluationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddEvaluationResponse;
  static deserializeBinaryFromReader(message: AddEvaluationResponse, reader: jspb.BinaryReader): AddEvaluationResponse;
}

export namespace AddEvaluationResponse {
  export type AsObject = {
    statusCode: number,
  }
}

export class AddMonitoringRegistryRequest extends jspb.Message {
  getMainUrl(): string;
  setMainUrl(value: string): void;

  getDomainName(): string;
  setDomainName(value: string): void;

  getIsMobile(): boolean;
  setIsMobile(value: boolean): void;

  getIsLandscape(): boolean;
  setIsLandscape(value: boolean): void;

  getDisplayWidth(): number;
  setDisplayWidth(value: number): void;

  getDisplayHeight(): number;
  setDisplayHeight(value: number): void;

  clearWebpagesList(): void;
  getWebpagesList(): Array<string>;
  setWebpagesList(value: Array<string>): void;
  addWebpages(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddMonitoringRegistryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddMonitoringRegistryRequest): AddMonitoringRegistryRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddMonitoringRegistryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddMonitoringRegistryRequest;
  static deserializeBinaryFromReader(message: AddMonitoringRegistryRequest, reader: jspb.BinaryReader): AddMonitoringRegistryRequest;
}

export namespace AddMonitoringRegistryRequest {
  export type AsObject = {
    mainUrl: string,
    domainName: string,
    isMobile: boolean,
    isLandscape: boolean,
    displayWidth: number,
    displayHeight: number,
    webpagesList: Array<string>,
  }
}

export class AddMonitoringRegistryResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  getMonitoringRegistryId(): number;
  setMonitoringRegistryId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddMonitoringRegistryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddMonitoringRegistryResponse): AddMonitoringRegistryResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddMonitoringRegistryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddMonitoringRegistryResponse;
  static deserializeBinaryFromReader(message: AddMonitoringRegistryResponse, reader: jspb.BinaryReader): AddMonitoringRegistryResponse;
}

export namespace AddMonitoringRegistryResponse {
  export type AsObject = {
    statusCode: number,
    monitoringRegistryId: number,
  }
}

export class GetMonitoredWebsitesRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMonitoredWebsitesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMonitoredWebsitesRequest): GetMonitoredWebsitesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMonitoredWebsitesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMonitoredWebsitesRequest;
  static deserializeBinaryFromReader(message: GetMonitoredWebsitesRequest, reader: jspb.BinaryReader): GetMonitoredWebsitesRequest;
}

export namespace GetMonitoredWebsitesRequest {
  export type AsObject = {
  }
}

export class GetMonitoredWebsitesResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  clearWebsitesList(): void;
  getWebsitesList(): Array<string>;
  setWebsitesList(value: Array<string>): void;
  addWebsites(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMonitoredWebsitesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMonitoredWebsitesResponse): GetMonitoredWebsitesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMonitoredWebsitesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMonitoredWebsitesResponse;
  static deserializeBinaryFromReader(message: GetMonitoredWebsitesResponse, reader: jspb.BinaryReader): GetMonitoredWebsitesResponse;
}

export namespace GetMonitoredWebsitesResponse {
  export type AsObject = {
    statusCode: number,
    websitesList: Array<string>,
  }
}

export class SetAccessibilityMetricRequest extends jspb.Message {
  getMonitoringRegistryId(): number;
  setMonitoringRegistryId(value: number): void;

  getAccessibilityMetric(): string;
  setAccessibilityMetric(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetAccessibilityMetricRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetAccessibilityMetricRequest): SetAccessibilityMetricRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetAccessibilityMetricRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetAccessibilityMetricRequest;
  static deserializeBinaryFromReader(message: SetAccessibilityMetricRequest, reader: jspb.BinaryReader): SetAccessibilityMetricRequest;
}

export namespace SetAccessibilityMetricRequest {
  export type AsObject = {
    monitoringRegistryId: number,
    accessibilityMetric: string,
  }
}

export class SetAccessibilityMetricResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetAccessibilityMetricResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetAccessibilityMetricResponse): SetAccessibilityMetricResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetAccessibilityMetricResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetAccessibilityMetricResponse;
  static deserializeBinaryFromReader(message: SetAccessibilityMetricResponse, reader: jspb.BinaryReader): SetAccessibilityMetricResponse;
}

export namespace SetAccessibilityMetricResponse {
  export type AsObject = {
    statusCode: number,
  }
}

export class CalculateAccessibilityScoreRequest extends jspb.Message {
  getMonitoringRegistryId(): number;
  setMonitoringRegistryId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CalculateAccessibilityScoreRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CalculateAccessibilityScoreRequest): CalculateAccessibilityScoreRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CalculateAccessibilityScoreRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CalculateAccessibilityScoreRequest;
  static deserializeBinaryFromReader(message: CalculateAccessibilityScoreRequest, reader: jspb.BinaryReader): CalculateAccessibilityScoreRequest;
}

export namespace CalculateAccessibilityScoreRequest {
  export type AsObject = {
    monitoringRegistryId: number,
  }
}

export class CalculateAccessibilityScoreResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  getAccessibilityScore(): number;
  setAccessibilityScore(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CalculateAccessibilityScoreResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CalculateAccessibilityScoreResponse): CalculateAccessibilityScoreResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CalculateAccessibilityScoreResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CalculateAccessibilityScoreResponse;
  static deserializeBinaryFromReader(message: CalculateAccessibilityScoreResponse, reader: jspb.BinaryReader): CalculateAccessibilityScoreResponse;
}

export namespace CalculateAccessibilityScoreResponse {
  export type AsObject = {
    statusCode: number,
    accessibilityScore: number,
  }
}

export class SetLatestEvaluationRequest extends jspb.Message {
  getMonitoringRegistryId(): number;
  setMonitoringRegistryId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetLatestEvaluationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetLatestEvaluationRequest): SetLatestEvaluationRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetLatestEvaluationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetLatestEvaluationRequest;
  static deserializeBinaryFromReader(message: SetLatestEvaluationRequest, reader: jspb.BinaryReader): SetLatestEvaluationRequest;
}

export namespace SetLatestEvaluationRequest {
  export type AsObject = {
    monitoringRegistryId: number,
  }
}

export class SetLatestEvaluationResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetLatestEvaluationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetLatestEvaluationResponse): SetLatestEvaluationResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetLatestEvaluationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetLatestEvaluationResponse;
  static deserializeBinaryFromReader(message: SetLatestEvaluationResponse, reader: jspb.BinaryReader): SetLatestEvaluationResponse;
}

export namespace SetLatestEvaluationResponse {
  export type AsObject = {
    statusCode: number,
  }
}

export class AddWebpagesRequest extends jspb.Message {
  getMonitoringRegistryId(): number;
  setMonitoringRegistryId(value: number): void;

  clearWebpagesList(): void;
  getWebpagesList(): Array<string>;
  setWebpagesList(value: Array<string>): void;
  addWebpages(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddWebpagesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddWebpagesRequest): AddWebpagesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddWebpagesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddWebpagesRequest;
  static deserializeBinaryFromReader(message: AddWebpagesRequest, reader: jspb.BinaryReader): AddWebpagesRequest;
}

export namespace AddWebpagesRequest {
  export type AsObject = {
    monitoringRegistryId: number,
    webpagesList: Array<string>,
  }
}

export class AddWebpagesResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddWebpagesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddWebpagesResponse): AddWebpagesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddWebpagesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddWebpagesResponse;
  static deserializeBinaryFromReader(message: AddWebpagesResponse, reader: jspb.BinaryReader): AddWebpagesResponse;
}

export namespace AddWebpagesResponse {
  export type AsObject = {
    statusCode: number,
  }
}

export class SetAccessibilityMetricAllWebsitesRequest extends jspb.Message {
  getAccessibilityMetric(): string;
  setAccessibilityMetric(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetAccessibilityMetricAllWebsitesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetAccessibilityMetricAllWebsitesRequest): SetAccessibilityMetricAllWebsitesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetAccessibilityMetricAllWebsitesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetAccessibilityMetricAllWebsitesRequest;
  static deserializeBinaryFromReader(message: SetAccessibilityMetricAllWebsitesRequest, reader: jspb.BinaryReader): SetAccessibilityMetricAllWebsitesRequest;
}

export namespace SetAccessibilityMetricAllWebsitesRequest {
  export type AsObject = {
    accessibilityMetric: string,
  }
}

export class SetAccessibilityMetricAllWebsitesResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetAccessibilityMetricAllWebsitesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetAccessibilityMetricAllWebsitesResponse): SetAccessibilityMetricAllWebsitesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetAccessibilityMetricAllWebsitesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetAccessibilityMetricAllWebsitesResponse;
  static deserializeBinaryFromReader(message: SetAccessibilityMetricAllWebsitesResponse, reader: jspb.BinaryReader): SetAccessibilityMetricAllWebsitesResponse;
}

export namespace SetAccessibilityMetricAllWebsitesResponse {
  export type AsObject = {
    statusCode: number,
  }
}

export class GetLatestAssertionsByWebpageRequest extends jspb.Message {
  getMonitoringRegistryId(): number;
  setMonitoringRegistryId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLatestAssertionsByWebpageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLatestAssertionsByWebpageRequest): GetLatestAssertionsByWebpageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLatestAssertionsByWebpageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLatestAssertionsByWebpageRequest;
  static deserializeBinaryFromReader(message: GetLatestAssertionsByWebpageRequest, reader: jspb.BinaryReader): GetLatestAssertionsByWebpageRequest;
}

export namespace GetLatestAssertionsByWebpageRequest {
  export type AsObject = {
    monitoringRegistryId: number,
  }
}

export class GetLatestAssertionsByWebpageResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  clearWebpagesList(): void;
  getWebpagesList(): Array<WebpageResponse>;
  setWebpagesList(value: Array<WebpageResponse>): void;
  addWebpages(value?: WebpageResponse, index?: number): WebpageResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLatestAssertionsByWebpageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetLatestAssertionsByWebpageResponse): GetLatestAssertionsByWebpageResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLatestAssertionsByWebpageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLatestAssertionsByWebpageResponse;
  static deserializeBinaryFromReader(message: GetLatestAssertionsByWebpageResponse, reader: jspb.BinaryReader): GetLatestAssertionsByWebpageResponse;
}

export namespace GetLatestAssertionsByWebpageResponse {
  export type AsObject = {
    statusCode: number,
    webpagesList: Array<WebpageResponse.AsObject>,
  }
}

export class WebpageResponse extends jspb.Message {
  getUrl(): string;
  setUrl(value: string): void;

  clearAssertionsList(): void;
  getAssertionsList(): Array<AssertionResponse>;
  setAssertionsList(value: Array<AssertionResponse>): void;
  addAssertions(value?: AssertionResponse, index?: number): AssertionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WebpageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: WebpageResponse): WebpageResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WebpageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WebpageResponse;
  static deserializeBinaryFromReader(message: WebpageResponse, reader: jspb.BinaryReader): WebpageResponse;
}

export namespace WebpageResponse {
  export type AsObject = {
    url: string,
    assertionsList: Array<AssertionResponse.AsObject>,
  }
}

export class AssertionResponse extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getPassed(): number;
  setPassed(value: number): void;

  getWarning(): number;
  setWarning(value: number): void;

  getFailed(): number;
  setFailed(value: number): void;

  getInapplicable(): number;
  setInapplicable(value: number): void;

  getOutcome(): string;
  setOutcome(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  hasMetadata(): boolean;
  clearMetadata(): void;
  getMetadata(): AssertionMetadataResponse | undefined;
  setMetadata(value?: AssertionMetadataResponse): void;

  clearIssuesList(): void;
  getIssuesList(): Array<IssueResponse>;
  setIssuesList(value: Array<IssueResponse>): void;
  addIssues(value?: IssueResponse, index?: number): IssueResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AssertionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AssertionResponse): AssertionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AssertionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AssertionResponse;
  static deserializeBinaryFromReader(message: AssertionResponse, reader: jspb.BinaryReader): AssertionResponse;
}

export namespace AssertionResponse {
  export type AsObject = {
    id: number,
    passed: number,
    warning: number,
    failed: number,
    inapplicable: number,
    outcome: string,
    description: string,
    metadata?: AssertionMetadataResponse.AsObject,
    issuesList: Array<IssueResponse.AsObject>,
  }
}

export class AssertionMetadataResponse extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getCode(): string;
  setCode(value: string): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  getMapping(): string;
  setMapping(value: string): void;

  clearTargetElementsList(): void;
  getTargetElementsList(): Array<string>;
  setTargetElementsList(value: Array<string>): void;
  addTargetElements(value: string, index?: number): string;

  clearTargetAttributesList(): void;
  getTargetAttributesList(): Array<string>;
  setTargetAttributesList(value: Array<string>): void;
  addTargetAttributes(value: string, index?: number): string;

  clearSuccessCriteriaList(): void;
  getSuccessCriteriaList(): Array<SuccessCriteria>;
  setSuccessCriteriaList(value: Array<SuccessCriteria>): void;
  addSuccessCriteria(value?: SuccessCriteria, index?: number): SuccessCriteria;

  getSuccessCriteriaQuantity(): number;
  setSuccessCriteriaQuantity(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AssertionMetadataResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AssertionMetadataResponse): AssertionMetadataResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AssertionMetadataResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AssertionMetadataResponse;
  static deserializeBinaryFromReader(message: AssertionMetadataResponse, reader: jspb.BinaryReader): AssertionMetadataResponse;
}

export namespace AssertionMetadataResponse {
  export type AsObject = {
    id: number,
    code: string,
    name: string,
    description: string,
    url: string,
    mapping: string,
    targetElementsList: Array<string>,
    targetAttributesList: Array<string>,
    successCriteriaList: Array<SuccessCriteria.AsObject>,
    successCriteriaQuantity: number,
  }
}

export class IssueResponse extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getAssertionId(): number;
  setAssertionId(value: number): void;

  getVerdict(): string;
  setVerdict(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getResultCode(): string;
  setResultCode(value: string): void;

  clearElementsList(): void;
  getElementsList(): Array<IssueElementResponse>;
  setElementsList(value: Array<IssueElementResponse>): void;
  addElements(value?: IssueElementResponse, index?: number): IssueElementResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IssueResponse.AsObject;
  static toObject(includeInstance: boolean, msg: IssueResponse): IssueResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IssueResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IssueResponse;
  static deserializeBinaryFromReader(message: IssueResponse, reader: jspb.BinaryReader): IssueResponse;
}

export namespace IssueResponse {
  export type AsObject = {
    id: number,
    assertionId: number,
    verdict: string,
    description: string,
    resultCode: string,
    elementsList: Array<IssueElementResponse.AsObject>,
  }
}

export class IssueElementResponse extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getHtmlCode(): string;
  setHtmlCode(value: string): void;

  getPointer(): string;
  setPointer(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IssueElementResponse.AsObject;
  static toObject(includeInstance: boolean, msg: IssueElementResponse): IssueElementResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IssueElementResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IssueElementResponse;
  static deserializeBinaryFromReader(message: IssueElementResponse, reader: jspb.BinaryReader): IssueElementResponse;
}

export namespace IssueElementResponse {
  export type AsObject = {
    id: number,
    htmlCode: string,
    pointer: string,
  }
}

export class GetLatestAssertionsByTestRequest extends jspb.Message {
  getMonitoringRegistryId(): number;
  setMonitoringRegistryId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLatestAssertionsByTestRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLatestAssertionsByTestRequest): GetLatestAssertionsByTestRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLatestAssertionsByTestRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLatestAssertionsByTestRequest;
  static deserializeBinaryFromReader(message: GetLatestAssertionsByTestRequest, reader: jspb.BinaryReader): GetLatestAssertionsByTestRequest;
}

export namespace GetLatestAssertionsByTestRequest {
  export type AsObject = {
    monitoringRegistryId: number,
  }
}

export class GetLatestAssertionsByTestResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  clearAssertionsList(): void;
  getAssertionsList(): Array<AssertionResponse>;
  setAssertionsList(value: Array<AssertionResponse>): void;
  addAssertions(value?: AssertionResponse, index?: number): AssertionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLatestAssertionsByTestResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetLatestAssertionsByTestResponse): GetLatestAssertionsByTestResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLatestAssertionsByTestResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLatestAssertionsByTestResponse;
  static deserializeBinaryFromReader(message: GetLatestAssertionsByTestResponse, reader: jspb.BinaryReader): GetLatestAssertionsByTestResponse;
}

export namespace GetLatestAssertionsByTestResponse {
  export type AsObject = {
    statusCode: number,
    assertionsList: Array<AssertionResponse.AsObject>,
  }
}

export class GetCurrentWarningsRequest extends jspb.Message {
  getMonitoringRegistryId(): number;
  setMonitoringRegistryId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCurrentWarningsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCurrentWarningsRequest): GetCurrentWarningsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCurrentWarningsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCurrentWarningsRequest;
  static deserializeBinaryFromReader(message: GetCurrentWarningsRequest, reader: jspb.BinaryReader): GetCurrentWarningsRequest;
}

export namespace GetCurrentWarningsRequest {
  export type AsObject = {
    monitoringRegistryId: number,
  }
}

export class GetCurrentWarningsResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  clearWarningsList(): void;
  getWarningsList(): Array<AssertionResponse>;
  setWarningsList(value: Array<AssertionResponse>): void;
  addWarnings(value?: AssertionResponse, index?: number): AssertionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCurrentWarningsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCurrentWarningsResponse): GetCurrentWarningsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCurrentWarningsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCurrentWarningsResponse;
  static deserializeBinaryFromReader(message: GetCurrentWarningsResponse, reader: jspb.BinaryReader): GetCurrentWarningsResponse;
}

export namespace GetCurrentWarningsResponse {
  export type AsObject = {
    statusCode: number,
    warningsList: Array<AssertionResponse.AsObject>,
  }
}

export class GetWebsiteScoreRequest extends jspb.Message {
  getMonitoringRegistryId(): number;
  setMonitoringRegistryId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetWebsiteScoreRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetWebsiteScoreRequest): GetWebsiteScoreRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetWebsiteScoreRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetWebsiteScoreRequest;
  static deserializeBinaryFromReader(message: GetWebsiteScoreRequest, reader: jspb.BinaryReader): GetWebsiteScoreRequest;
}

export namespace GetWebsiteScoreRequest {
  export type AsObject = {
    monitoringRegistryId: number,
  }
}

export class GetWebsiteScoreResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  getScore(): number;
  setScore(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetWebsiteScoreResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetWebsiteScoreResponse): GetWebsiteScoreResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetWebsiteScoreResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetWebsiteScoreResponse;
  static deserializeBinaryFromReader(message: GetWebsiteScoreResponse, reader: jspb.BinaryReader): GetWebsiteScoreResponse;
}

export namespace GetWebsiteScoreResponse {
  export type AsObject = {
    statusCode: number,
    score: number,
  }
}

export class GetMonitoringRegistryRequest extends jspb.Message {
  getMonitoringRegistryId(): number;
  setMonitoringRegistryId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMonitoringRegistryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMonitoringRegistryRequest): GetMonitoringRegistryRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMonitoringRegistryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMonitoringRegistryRequest;
  static deserializeBinaryFromReader(message: GetMonitoringRegistryRequest, reader: jspb.BinaryReader): GetMonitoringRegistryRequest;
}

export namespace GetMonitoringRegistryRequest {
  export type AsObject = {
    monitoringRegistryId: number,
  }
}

export class GetMonitoringRegistryResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  getId(): number;
  setId(value: number): void;

  getAccessibilityMetric(): string;
  setAccessibilityMetric(value: string): void;

  getMainUrl(): string;
  setMainUrl(value: string): void;

  getDomainName(): string;
  setDomainName(value: string): void;

  getIsMobile(): boolean;
  setIsMobile(value: boolean): void;

  getIsLandscape(): boolean;
  setIsLandscape(value: boolean): void;

  getDisplayWidth(): number;
  setDisplayWidth(value: number): void;

  getDisplayHeight(): number;
  setDisplayHeight(value: number): void;

  clearWebpagesList(): void;
  getWebpagesList(): Array<string>;
  setWebpagesList(value: Array<string>): void;
  addWebpages(value: string, index?: number): string;

  getLatestEvaluation(): string;
  setLatestEvaluation(value: string): void;

  getAccessibilityScore(): number;
  setAccessibilityScore(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMonitoringRegistryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMonitoringRegistryResponse): GetMonitoringRegistryResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMonitoringRegistryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMonitoringRegistryResponse;
  static deserializeBinaryFromReader(message: GetMonitoringRegistryResponse, reader: jspb.BinaryReader): GetMonitoringRegistryResponse;
}

export namespace GetMonitoringRegistryResponse {
  export type AsObject = {
    statusCode: number,
    id: number,
    accessibilityMetric: string,
    mainUrl: string,
    domainName: string,
    isMobile: boolean,
    isLandscape: boolean,
    displayWidth: number,
    displayHeight: number,
    webpagesList: Array<string>,
    latestEvaluation: string,
    accessibilityScore: number,
  }
}

export class GetIssuesStatsRequest extends jspb.Message {
  getMonitoringRegistryId(): number;
  setMonitoringRegistryId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetIssuesStatsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetIssuesStatsRequest): GetIssuesStatsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetIssuesStatsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetIssuesStatsRequest;
  static deserializeBinaryFromReader(message: GetIssuesStatsRequest, reader: jspb.BinaryReader): GetIssuesStatsRequest;
}

export namespace GetIssuesStatsRequest {
  export type AsObject = {
    monitoringRegistryId: number,
  }
}

export class GetIssuesStatsResponse extends jspb.Message {
  getStatusCode(): number;
  setStatusCode(value: number): void;

  getPassed(): number;
  setPassed(value: number): void;

  getWarnings(): number;
  setWarnings(value: number): void;

  getFailed(): number;
  setFailed(value: number): void;

  getInapplicable(): number;
  setInapplicable(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetIssuesStatsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetIssuesStatsResponse): GetIssuesStatsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetIssuesStatsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetIssuesStatsResponse;
  static deserializeBinaryFromReader(message: GetIssuesStatsResponse, reader: jspb.BinaryReader): GetIssuesStatsResponse;
}

export namespace GetIssuesStatsResponse {
  export type AsObject = {
    statusCode: number,
    passed: number,
    warnings: number,
    failed: number,
    inapplicable: number,
  }
}

