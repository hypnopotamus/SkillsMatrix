import ReactDOM from 'react-dom';
import App from './App';
import { registerPage } from "ui-container/src/registerPage";
import { Page } from "ui-container/src/Page";

//todo don't open the page when running as a plugin
//todo allow running as a standalone page (which does open a browser page)
//https://github.com/hypnopotamus/SkillsMatrix/issues/29
class Comparison extends Page {
  render(mountPoint: Element): void {
    ReactDOM.render(
      <App />,
      mountPoint
    );
  }
}

registerPage("Comparison", Comparison);