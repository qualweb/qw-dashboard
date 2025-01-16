import { QualwebReport } from '@qualweb/core';
import { Request, Response, NextFunction } from 'express';

const express = require('express');
const evaluate = require('./evaluate');
const app = express();
const port = 8081;

app.use(express.json());

// This endpoint executes the evaluations
app.post('/api/evaluate', (req: Request, res: Response) => {
    const urlToEvaluate = req.body.url

    evaluate(urlToEvaluate).then((report: QualwebReport) => {
        if (report)
            res.send(report.modules);
        else
            res.status(400).send('Could not find the URL send to evaluate.');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});