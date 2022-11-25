import { IPageActionTelemetry } from '@microsoft/applicationinsights-clickanalytics-js/types/Interfaces/Datamodel';
import { ApplicationInsights, ITelemetryItem } from '@microsoft/applicationinsights-web';
import { sendEvent } from './client';

const isClickEvent = (telemetry: ITelemetryItem): telemetry is ITelemetryItem & { data: IPageActionTelemetry & { readonly baseTypeSource: string } } => telemetry.baseType === "EventData"
    && telemetry.data != null
    && telemetry.data.baseTypeSource === "ClickEvent";

export const observeClient = (appInsights: ApplicationInsights) => {
    appInsights.addTelemetryInitializer((telemetry) => {
        if (isClickEvent(telemetry)) {
            try {
                const { data } = telemetry;
                sendEvent(`${data.pageName} ${data.baseTypeSource}`, data)
                    .catch(error => console.log(error));
            }
            catch (error) {
                console.log(error);
            }
        }

        return true;
    });
};