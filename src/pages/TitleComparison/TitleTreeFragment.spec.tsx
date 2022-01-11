import TitleTreeFragment from "./TitleTreeFragment";
import createTheme, { Theme } from "@mui/material/styles/createTheme";
import { useTheme } from "@mui/material/styles";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { titleFactory } from "./titleTree/titleFactory";
import { addTitleEquivalents } from "./titleTree/addTitleEquivalents";
import { addPromotions } from "./titleTree/addPromotions";

jest.mock("@mui/material/styles");
jest.mock("fabricjs-react");
jest.mock("./titleTree/titleFactory");
jest.mock("./titleTree/addTitleEquivalents");
jest.mock("./titleTree/addPromotions");

const fakeUseTheme = useTheme as jest.Mock<typeof useTheme>;
const fakeUseFabricJSEditor = useFabricJSEditor as unknown as jest.Mock<typeof useFabricJSEditor>;
const fakeTitleFactory = titleFactory as unknown as jest.Mock<typeof titleFactory>;
const fakeAddTitleEquivalents = addTitleEquivalents as jest.Mock<typeof addTitleEquivalents>;
const fakeAddPromotions = addPromotions as jest.Mock<typeof addPromotions>;

const theme = createTheme();
//fakeUseTheme.mockReturnValue(theme);

describe(`<TitleTreeFragment />`, () => {
    describe(`when there is no title selected`, () => {
        it(`renders nothing`, () => {

        });
    });

    describe(`when there is a title selected`, () => {
        it(`renders a fabric canvas`, () => {

        });

        describe(`when the canvas editor is ready`, () => {
            it(`clears the canvas`, () => {

            });

            it(`adds the selected title in the primary theme color`, () => {

            });

            it(`adds equivalent titles to the selected one`, () => {

            });

            it(`adds promotions from the selected title`, () => {

            });
        });
    });
});