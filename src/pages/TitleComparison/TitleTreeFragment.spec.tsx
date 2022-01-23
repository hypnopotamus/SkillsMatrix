import { Palette, PaletteColor, Theme, useTheme } from "@mui/material/styles";
import { shallow } from "enzyme";
import { FabricJSCanvas, FabricJSEditor, useFabricJSEditor } from "fabricjs-react";
import { mocked } from "jest-mock";
import { v4 as randomString } from "uuid";
import { Title } from "../../core/titles/Title";
import { addPromotions } from "./titleTree/addPromotions";
import { addTitleEquivalents } from "./titleTree/addTitleEquivalents";
import { Color } from "./titleTree/Color";
import { titleFactory } from "./titleTree/titleFactory";
import TitleTreeFragment from "./TitleTreeFragment";

jest.mock("@mui/material/styles", () => {
    const realStyles = jest.requireActual("@mui/material/styles");

    return {
        ...realStyles,
        useTheme: jest.fn()
    }
});
jest.mock("fabricjs-react");
jest.mock("./titleTree/titleFactory");
jest.mock("./titleTree/addTitleEquivalents");
jest.mock("./titleTree/addPromotions");

const randomColor = (): PaletteColor => {
    return {
        light: "",
        main: randomString(),
        dark: "",
        contrastText: ""
    };
};
const palette: Partial<Palette> = {
    primary: randomColor(),
    secondary: randomColor(),
    grey: {
        50: randomString(),
        100: randomString(),
        200: randomString(),
        300: randomString(),
        400: randomString(),
        500: randomString(),
        600: randomString(),
        700: randomString(),
        800: randomString(),
        900: randomString(),
        A100: randomString(),
        A200: randomString(),
        A400: randomString(),
        A700: randomString(),
    }
};
const theme: Partial<Theme> = {
    palette: palette as Palette
};

const fabricOnReady = jest.fn();
mocked(useFabricJSEditor)
    .mockReturnValue({ selectedObjects: [], editor: undefined, onReady: fabricOnReady });

const fakeTitleFactory = mocked(titleFactory);
const fakeAddTitleEquivalents = mocked(addTitleEquivalents);
const fakeAddPromotions = mocked(addPromotions);

describe(`<TitleTreeFragment />`, () => {
    describe(`when there is no title selected`, () => {
        const titleTreeFragment = shallow(<TitleTreeFragment selectComparison={() => { }} />);

        it(`renders nothing`, () => {
            expect(titleTreeFragment.isEmptyRender()).toBe(true);
        });
    });

    describe(`when there is a title selected`, () => {
        const title: Title = {
            title: "",
            skills: undefined!,
            nextLevels: [],
            equivalentLevels: []
        };
        mocked(useTheme).mockReturnValue(theme);
        const titleTreeFragment = shallow(<TitleTreeFragment title={title} selectComparison={() => { }} />);

        it(`renders a fabric canvas`, () => {
            const canvas = titleTreeFragment.find(FabricJSCanvas);

            expect(canvas.prop("onReady")).toBe(fabricOnReady);
        });

        describe(`when the canvas editor is ready`, () => {
            const canvas: Partial<fabric.Canvas> = {
                add: jest.fn(),
                clear: jest.fn(),
                setHeight: jest.fn()
            };
            const editor: Partial<FabricJSEditor> = {
                canvas: canvas as fabric.Canvas
            };
            const selectComparison = jest.fn();
            const selectedTitle: Title = {
                title: "",
                skills: undefined!,
                nextLevels: [],
                equivalentLevels: []
            };
            const titleComparison: Title = {
                title: "",
                skills: undefined!,
                nextLevels: [],
                equivalentLevels: []
            };
            const unselectedColor: Color = {
                light: theme.palette!.grey[300],
                dark: theme.palette!.grey[600]
            };
            const selectedTitleGroup: Partial<fabric.Group> = {};

            beforeEach(() => {
                fakeTitleFactory.mockReturnValue(selectedTitleGroup as fabric.Group);
                mocked(useTheme).mockReturnValue(theme);
                mocked(useFabricJSEditor)
                    .mockReturnValueOnce({ selectedObjects: [], editor: editor as FabricJSEditor, onReady: fabricOnReady });

                shallow(<TitleTreeFragment title={selectedTitle} comparison={titleComparison} selectComparison={selectComparison} />);
            });

            it(`clears the canvas`, () => {
                expect(canvas.clear).toHaveBeenCalledTimes(1);
            });

            it(`adds the selected title in the primary theme color`, () => {
                expect(fakeTitleFactory).toHaveBeenCalledWith(selectedTitle, theme.palette!.primary);
                expect(canvas.add).toHaveBeenCalledWith(selectedTitleGroup);
            });

            it(`adds equivalent titles to the selected one`, () => {
                expect(fakeAddTitleEquivalents).toHaveBeenCalledWith(
                    canvas,
                    selectedTitle,
                    titleComparison,
                    selectedTitleGroup,
                    theme.palette!.secondary,
                    unselectedColor,
                    selectComparison,
                );
            });

            it(`adds promotions from the selected title`, () => {
                expect(fakeAddPromotions).toHaveBeenCalledWith(
                    canvas,
                    selectedTitle,
                    titleComparison,
                    theme.palette!.secondary,
                    unselectedColor,
                    selectComparison,
                );
            });
        });
    });
});