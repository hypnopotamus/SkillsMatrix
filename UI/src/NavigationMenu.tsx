import { Button, ButtonGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { IPage } from "./IPage";
import { pageSelected } from "./pageReducer";
import { Dispatch, State } from "./reduxStore";

export const NavigationMenu = () => {
    const pages = useSelector<State, readonly IPage[]>(s => s.pages);
    const dispatch = useDispatch<Dispatch>();
    const selectPage = (page: IPage) => dispatch(pageSelected(page));

    console.log('NavigationMenu');
    console.log('Nav.Menu, pages = ', pages);

    //todo current page first, selected
    //https://github.com/hypnopotamus/SkillsMatrix/issues/31
    return (
        <ButtonGroup variant="text">
            {pages.map(p => (
                <Button id={p.elementname}
                    onClick={() => selectPage(p)}
                >
                    {p.name}
                </Button>
            ))}
        </ButtonGroup>

    );
};