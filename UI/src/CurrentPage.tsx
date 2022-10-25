import { useSelector } from "react-redux";
import { State } from "./reduxStore";

export const pageElementProperty = "elementid";

export const CurrentPage = () => {
    const pageElementId = "the-page";
    const page = useSelector<State, string | undefined>(s => s.pages.find(p => p.selected)?.elementname);

    return page ?
        <div id={pageElementId} dangerouslySetInnerHTML={{ __html: `<${page} ${pageElementProperty}='${pageElementId}'/>` }} />
        : <div id={pageElementId} />;
};
