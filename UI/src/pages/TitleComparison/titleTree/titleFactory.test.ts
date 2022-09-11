import { titleFactory } from "./titleFactory";
import { v4 as randomString } from "uuid";
import { Title } from "skills-matrix-server/src/domain/Title";
import { Color } from "./Color";

const title: Title = {
    title: randomString(),
    skills: undefined!,
    nextLevels: [],
    equivalentLevels: []
};

const color: Color = {
    light: randomString(),
    dark: randomString()
}

describe(`titleFactory`, () => {
    const titleGroup = titleFactory(title, color);

    it(`adds a circle in the color supplied`, () => {
        const circles = titleGroup.getObjects("circle");

        expect(circles).toHaveLength(1);
        expect(circles[0].fill).toBe(color.light);
        expect(circles[0].stroke).toBe(color.dark);
    });

    it(`adds a label for the title`, () => {
        const labels = titleGroup.getObjects("textbox");

        expect(labels).toHaveLength(1);
        expect((labels[0] as fabric.Textbox).text).toBe(title.title);
    });

    describe(`when onSelected is supplied`, () => {
        let selectedTitle: Title | undefined;
        const onSelected = (title: Title) => selectedTitle = title;
        const titleGroup = titleFactory(title, color, onSelected);

        it(`is selectable`, () => {
            expect(titleGroup.selectable).toBe(true);
        });

        it(`has a pointer as the cursor`, () => {
            expect(titleGroup.hoverCursor).toBe("pointer");
        });

        it(`executes onSelected when selected`, () => {
            const bubbles = !titleGroup.onSelect({ e: undefined });

            expect(bubbles).toBe(false);
            expect(selectedTitle).toBe(title);
        });
    });

    describe(`when onSelected is not supplied`, () => {
        const titleGroup = titleFactory(title, color);

        it(`is not selectable`, () => {
            expect(titleGroup.selectable).toBe(false);
        });

        it(`uses the defualt cursor`, () => {
            expect(titleGroup.hoverCursor).toBe("default");
        });
    });
});