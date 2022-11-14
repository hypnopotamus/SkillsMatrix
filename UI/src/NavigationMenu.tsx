import { Button, ButtonGroup } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IPage } from "./IPage";
import { pageSelected } from "./pageReducer";
import { Dispatch, State } from "./reduxStore";

export const NavigationMenu = () => {
    const pages = useSelector<State, readonly IPage[]>(s => s.pages);
    const dispatch = useDispatch<Dispatch>();
    const theme = useTheme();
    const selectPage = (page: IPage) => dispatch(pageSelected(page));

    const buttonStyle = {
        color: "white"
    }

    //todo current page first, selected
    //https://github.com/hypnopotamus/SkillsMatrix/issues/31
    return (
        <ButtonGroup variant="text"> {
            pages.map(p =>
                <Button id={p.elementname}
                    style={buttonStyle}
                    onClick={() => selectPage(p)}
                >
                    {p.name}
                </Button>
            )}
        </ButtonGroup>
    );
};