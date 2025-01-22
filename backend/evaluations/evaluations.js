"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var evaluations_pb_1 = require("./protobuf_library/evaluations_pb");
var dotenv = require("dotenv");
dotenv.config();
// Access environment variables
var evaluations_database_ip = process.env.EVALUATIONS_DATABASE_HOST;
var EvaluationsClient = require('./protobuf_library/evaluations_grpc_pb.js').EvaluationsClient;
var grpc = require('@grpc/grpc-js');
var express = require('express');
var evaluate = require('./evaluate');
var app = express();
var port = 8081;
app.use(express.json());
console.debug(evaluations_database_ip);
var client = new EvaluationsClient(evaluations_database_ip + ':6000', grpc.credentials.createInsecure());
console.debug(client);
// This endpoint executes the evaluations
app.post('/api/evaluate', function (req, res) {
    var urlToEvaluate = req.body.url;
    evaluate(urlToEvaluate).then(function (report) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        if (report) {
            var evaluations_request = new evaluations_pb_1.AddEvaluationRequest();
            evaluations_request.setQualwebVersion(report.system.version);
            evaluations_request.setInputUrl((_b = (_a = report.system.url) === null || _a === void 0 ? void 0 : _a.inputUrl) !== null && _b !== void 0 ? _b : "");
            evaluations_request.setDomainName((_d = (_c = report.system.url) === null || _c === void 0 ? void 0 : _c.domainName) !== null && _d !== void 0 ? _d : "");
            evaluations_request.setDomain((_f = (_e = report.system.url) === null || _e === void 0 ? void 0 : _e.domain) !== null && _f !== void 0 ? _f : "");
            evaluations_request.setUri((_h = (_g = report.system.url) === null || _g === void 0 ? void 0 : _g.uri) !== null && _h !== void 0 ? _h : "");
            evaluations_request.setCompleteUrl((_k = (_j = report.system.url) === null || _j === void 0 ? void 0 : _j.completeUrl) !== null && _k !== void 0 ? _k : "");
            evaluations_request.setMobile((_l = report.system.page.viewport.mobile) !== null && _l !== void 0 ? _l : false);
            evaluations_request.setLandscape((_m = report.system.page.viewport.landscape) !== null && _m !== void 0 ? _m : false);
            evaluations_request.setDisplayWidth((_p = (_o = report.system.page.viewport.resolution) === null || _o === void 0 ? void 0 : _o.width) !== null && _p !== void 0 ? _p : 0);
            evaluations_request.setDisplayHeight((_r = (_q = report.system.page.viewport.resolution) === null || _q === void 0 ? void 0 : _q.height) !== null && _r !== void 0 ? _r : 0);
            evaluations_request.setDom(report.system.page.dom.html);
            evaluations_request.setTitle((_s = report.system.page.dom.title) !== null && _s !== void 0 ? _s : "");
            evaluations_request.setElementCount((_t = report.system.page.dom.elementCount) !== null && _t !== void 0 ? _t : 0);
            evaluations_request.setPassed(report.metadata.passed);
            evaluations_request.setWarning(report.metadata.warning);
            evaluations_request.setFailed(report.metadata.failed);
            evaluations_request.setInapplicable(report.metadata.inapplicable);
            client.addEvaluation(evaluations_request, function (err, response) {
                console.debug(response.getStatusCode());
            });
            res.send(report);
        }
        else
            res.status(400).send('Could not find the URL send to evaluate.');
    });
});
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
