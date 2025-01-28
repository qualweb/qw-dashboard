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

  getDomainName(): string;
  setDomainName(value: string): void;

  getDomain(): string;
  setDomain(value: string): void;

  getUri(): string;
  setUri(value: string): void;

  getCompleteUrl(): string;
  setCompleteUrl(value: string): void;

  getMobile(): boolean;
  setMobile(value: boolean): void;

  getLandscape(): boolean;
  setLandscape(value: boolean): void;

  getDisplayWidth(): number;
  setDisplayWidth(value: number): void;

  getDisplayHeight(): number;
  setDisplayHeight(value: number): void;

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
    domainName: string,
    domain: string,
    uri: string,
    completeUrl: string,
    mobile: boolean,
    landscape: boolean,
    displayWidth: number,
    displayHeight: number,
    dom: string,
    title: string,
    elementCount: number,
    passed: number,
    warning: number,
    failed: number,
    inapplicable: number,
    modulesList: Array<Module.AsObject>,
    modulesQuantity: number,
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

