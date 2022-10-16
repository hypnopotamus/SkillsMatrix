import { useSelector } from "react-redux";
import { State } from "./reduxStore";

export const pageElementProperty = "elementid";

export const CurrentPage = () => {
    const pageElementId = "the-page";
    const page = useSelector<State, string | undefined>(s => s.pages.find(p => p.selected)?.elementname);

    //rendering ON this node is working
    //rendering with appended shadow elements is not
    //but that means bidirectional communication between this component and the custom component to send the ID backwards
    return page ?
        <div id={pageElementId} dangerouslySetInnerHTML={{ __html: `<${page} ${pageElementProperty}='${pageElementId}'/>` }} />
        : <div id={pageElementId} />;
};
