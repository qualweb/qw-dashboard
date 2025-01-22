import { QualwebReport } from '@qualweb/core';
import { Request, Response, NextFunction } from 'express';
import { AddEvaluationRequest, AddEvaluationResponse} from './protobuf_library/evaluations_pb';
import * as dotenv from 'dotenv';

dotenv.config();

// Access environment variables
const evaluations_database_ip = process.env.EVALUATIONS_DATABASE_HOST;

const { EvaluationsClient } = require('./protobuf_library/evaluations_grpc_pb.js');

const grpc = require('@grpc/grpc-js');
const express = require('express');
const evaluate = require('./evaluate');
const app = express();
const port = 8081;

app.use(express.json());

console.debug(evaluations_database_ip);
const client = new EvaluationsClient(evaluations_database_ip + ':6000', grpc.credentials.createInsecure());
console.debug(client);

// This endpoint executes the evaluations
app.post('/api/evaluate', (req: Request, res: Response) => {
    const urlToEvaluate = req.body.url

    evaluate(urlToEvaluate).then((report: QualwebReport) => {
        if (report) {
            const evaluations_request = new AddEvaluationRequest();

            evaluations_request.setQualwebVersion(report.system.version);
            evaluations_request.setInputUrl(report.system.url?.inputUrl ?? "");
            evaluations_request.setDomainName(report.system.url?.domainName ?? "");
            evaluations_request.setDomain(report.system.url?.domain ?? "");
            evaluations_request.setUri(report.system.url?.uri ?? "");
            evaluations_request.setCompleteUrl(report.system.url?.completeUrl ?? "");
            evaluations_request.setMobile(report.system.page.viewport.mobile ?? false);
            evaluations_request.setLandscape(report.system.page.viewport.landscape ?? false);
            evaluations_request.setDisplayWidth(report.system.page.viewport.resolution?.width ?? 0);
            evaluations_request.setDisplayHeight(report.system.page.viewport.resolution?.height ?? 0);
            evaluations_request.setDom(report.system.page.dom.html);
            evaluations_request.setTitle(report.system.page.dom.title ?? "");
            evaluations_request.setElementCount(report.system.page.dom.elementCount ?? 0);
            evaluations_request.setPassed(report.metadata.passed);
            evaluations_request.setWarning(report.metadata.warning);
            evaluations_request.setFailed(report.metadata.failed);
            evaluations_request.setInapplicable(report.metadata.inapplicable);

            client.addEvaluation(evaluations_request, (err : Error , response : AddEvaluationResponse) => {
                console.debug(response.getStatusCode())
            });
            
            res.send(report);
        }
        else
            res.status(400).send('Could not find the URL send to evaluate.');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});