// package: runtimePackage
// file: evaluations.proto

import * as jspb from "google-protobuf";

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

