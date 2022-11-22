import * as appInsights from 'applicationinsights';
import express from "express";
import cookieParser from "cookie-parser";
import { APPLICATIONINSIGHTS_CONNECTION_STRING_COOKIE } from './applicationInsightsClient';

if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
    appInsights
        .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
        .setAutoDependencyCorrelation(true)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true, true)
        .setAutoCollectExceptions(true)
        .setAutoCollectDependencies(true)
        .setAutoCollectConsole(true)
        .setSendLiveMetrics(true)
        .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
        .start();

    //todo telemtry initializer to observe telemetry and forward some to George
}

export const hostFiles = (directory: string, ...ports: number[]) => {
    const app = express();

    app.use(cookieParser());

    app.use((req, res, next) => {
        if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
            if (!req.cookies[APPLICATIONINSIGHTS_CONNECTION_STRING_COOKIE]) {
                res.cookie(APPLICATIONINSIGHTS_CONNECTION_STRING_COOKIE, process.env.APPLICATIONINSIGHTS_CONNECTION_STRING);
            }
        }

        next();
    }, express.static(directory));
    app.get("/health", (req, res) => {
        res.send("Healthy");
    });

    for (const port of ports) {
        app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    }
}