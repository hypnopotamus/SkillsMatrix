import ReactDOM from 'react-dom';
import App from './App';
import { registerPage } from "@skillsmatrix/ui-container/src/registerPage";
import { Page } from "@skillsmatrix/ui-container/src/Page";

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