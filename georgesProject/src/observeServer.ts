import * as appInsights from 'applicationinsights';
import { DataTelemetry, RequestData } from 'applicationinsights/out/Declarations/Contracts';
import { sendEvent } from './client';

const isRequestData = (data: DataTelemetry): data is DataTelemetry & { baseData: RequestData } => data.baseType === "RequestData" && data.baseData != null;

export const observeServer = () => {
    appInsights.defaultClient.addTelemetryProcessor(({ data }) => {
        if (isRequestData(data)) {
            try {
                const { baseData } = data;
                if (!baseData.url.endsWith("health")) {
                    sendEvent(baseData.name, baseData.properties)
                        .catch(error => console.log(error));
                }
            }
            catch (error) {
                console.log(error);
            }
        }

        return true;
    });
}