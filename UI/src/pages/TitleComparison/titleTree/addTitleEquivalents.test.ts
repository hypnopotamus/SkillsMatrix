import { addTitleEquivalents } from "./addTitleEquivalents";
import { fabric } from "fabric";
import { titleFactory as titleGroupFactory } from "./titleFactory";
import { mocked } from "jest-mock";
import { Title } from "../../../core/titles/Title";
import { v4 as randomString } from "uuid";
import { connect } from "./connect";
import { Color } from "./Color";

jest.mock("./titleFactory");
const fakeTitleGroupFactory = mocked(titleGroupFactory);
jest.mock("./connect");
const fakeConnect = mocked(connect);

const fabricGroupFactory = (): fabric.Group => {
    const group: Partial<fabric.Group> = {
        top: Math.random(),
        left: Math.random(),
        setCoords: jest.fn(),
        getObjects: jest.fn(),
    };
    const center = jest.fn();
    center.mockReturnValue(group);
    group.center = center;
    const getObjects = jest.fn();
    const circle: Partial<fabric.Object> = {
        type: "circle"
    };
    getObjects.mockImplementation((type?: string) => {
        if (type && type === circle.type) return [circle];
    
        return [];
    });
    group.getObjects = getObjects;
    group.data = {
        circle
    };

    return group as fabric.Group;
}

fakeTitleGroupFactory.mockImplementation((title, color, onSelected?) => {
    const group = fabricGroupFactory();
    group.data = {
        ...group.data,
        title,
        color,
        onSelected
    };

    return group;
});

const canvasObjects: fabric.Object[] = [];
const canvas: Partial<fabric.Canvas> = {
};
canvas.add = (...objects) => {
    canvasObjects.push(...objects);

    return canvas as fabric.Canvas;
};
const titleFactory = (): Title => ({
    title: randomString(),
    skills: undefined!,
    nextLevels: [],
    equivalentLevels: []
});
const title = titleFactory();
const comparison = titleFactory();
title.equivalentLevels.push(titleFactory(), comparison, titleFactory());
const selectedGroup = fabricGroupFactory();
const comparisonColor: Color = {
    light: randomString(),
    dark: randomString()
};
const unselectedColor: Color = {
    light: randomString(),
    dark: randomString()
};
const selectComparison = jest.fn();

describe(`addTitleEquivalents`, () => {
    addTitleEquivalents(
        canvas as fabric.Canvas,
        title,
        comparison,
        selectedGroup as fabric.Group,
        comparisonColor,
        unselectedColor,
        selectComparison
    );

    it.each(canvasObjects)(`places equivalent titles on the same height, spread out`, (equivalentGroup) => {
        const otherGroups = canvasObjects.filter(o => o !== equivalentGroup).concat(selectedGroup);

        expect(equivalentGroup.top).toBe(selectedGroup.top);
        expect(otherGroups.map(g => g.left)).not.toContain(equivalentGroup.left);
    });

    it.each(canvasObjects as fabric.Group[])(`draws lines between each equivalent title and the selected one`, (equivalentGroup: fabric.Group) => {
        expect(fakeConnect).toHaveBeenCalledWith(canvas, selectedGroup.data.circle, equivalentGroup.data.circle);
    });

    describe(`when an equivalent is the selected comparison`, () => {
        const equivalentGroup = canvasObjects.filter(o => o.data.title === comparison)[0];

        fit(`is added in the comparison color`, () => {
            expect(equivalentGroup.data.color).toBe(comparisonColor);
        });

        it(`is added without being able to be selected`, () => {
            expect(equivalentGroup.data.onSelected).toBeFalsy();
        });
    });

    describe.each(canvasObjects.filter(o => o.data.title !== comparison))(`non-selected equivalent titles`, (equivalentGroup: fabric.Object) => {
        it(`is added in the unselected color`, () => {
            expect(equivalentGroup.data.color).toBe(unselectedColor);
        });

        it(`is added and is able to be selected`, () => {
            expect(equivalentGroup.data.onSelected).toBe(selectComparison);
        });
    });
});