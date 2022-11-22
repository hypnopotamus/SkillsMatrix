import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { getApplicationInsightsConnectionString } from '@skillsmatrix/contentserver/dist/applicationInsightsClient';
import ReactDOM from 'react-dom';
import { App } from './App';
import './registerPageImpl';

const applicationInsights = getApplicationInsightsConnectionString();
if (applicationInsights) {
  const appInsightsReact = new ReactPlugin();
  const appInsights = new ApplicationInsights({
    config: {
      connectionString: applicationInsights,
      extensions: [appInsightsReact],
      enableAutoRouteTracking: true,
      enableRequestHeaderTracking: true,
      enableResponseHeaderTracking: true,
    }
  });
  appInsights.loadAppInsights();
  //todo: hook up to George's project with a telemetry initializer

  //todo double check that the comparison page is also instrumented by virtue of rendering in this app's page
  //todo double check I still get some app insights even without wrapping a component in withAITracking and without enabling track page view
  //todo try https://learn.microsoft.com/en-us/azure/azure-monitor/app/javascript-click-analytics-plugin to track clicks on buttons and elements
}


ReactDOM.render(
  <App />,
  document.querySelector("#root")
);