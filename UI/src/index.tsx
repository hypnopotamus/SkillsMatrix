import { ClickAnalyticsPlugin } from '@microsoft/applicationinsights-clickanalytics-js';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { getApplicationInsightsConnectionString } from '@skillsmatrix/contentserver/dist/applicationInsightsClient';
// import { observeClient } from "@skillsmatrix/georgesproject/dist/observeClient";
import ReactDOM from 'react-dom';
import { App } from './App';
import './registerPageImpl';

const applicationInsights = getApplicationInsightsConnectionString();
if (applicationInsights) {
  const appInsightsReact = new ReactPlugin();
  const appInsightsClicks = new ClickAnalyticsPlugin();
  const appInsights = new ApplicationInsights({
    config: {
      connectionString: applicationInsights,
      extensions: [
        appInsightsReact,
        appInsightsClicks
      ],
      extensionConfig: {
        [appInsightsClicks.identifier]: {
          autoCapture: true,
          dataTags: {
            useDefaultContentNameOrId: true
          }
        }
      },
      enableAutoRouteTracking: true,
      enableRequestHeaderTracking: true,
      enableResponseHeaderTracking: true,
    }
  });
  appInsights.loadAppInsights();

  //George needs to enable CORS for the client to be observed
  //observeClient(appInsights);
}


ReactDOM.render(
  <App />,
  document.querySelector("#root")
);