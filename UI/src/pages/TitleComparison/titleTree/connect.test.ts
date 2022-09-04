import { connect } from "./connect";
import { fabric } from "fabric";

jest.mock("fabric", () => {
    const actualFabric = jest.requireActual("fabric");

    return {
        ...actualFabric,
        fabric: {
            ...actualFabric.fabric,
            Canvas: jest.fn()
        }
    };
})

type fakeCanvas = fabric.Canvas & {
    readonly objects: fabric.Object[];
}

const canvasFactory = (): fakeCanvas => {
    const factory = (): fakeCanvas => {
        const canvas = {
            ...new fabric.Canvas(null),
            objects: []
        };

        return canvas as unknown as fakeCanvas;
    };
    const canvas = factory();

    canvas.add = (...objects: fabric.Object[]): fabric.Canvas => {
        canvas.objects.push(...objects);

        return canvas;
    };

    return canvas;
};

const isLine = (object: any | fabric.Line): object is fabric.Line => object.x1 && object.x2 && object.y1 && object.y2;

describe(`connect`, () => {
    const itDrawsALine = (canvas: fakeCanvas, from: fabric.Point, to: fabric.Point) => it(`draws a line from from to to`, () => {
        const lines = canvas.objects.filter(isLine);

        expect(lines).toHaveLength(1);
        expect(lines[0].x1).toBe(from.x);
        expect(lines[0].x2).toBe(to.x);
        expect(lines[0].y1).toBe(from.y);
        expect(lines[0].y2).toBe(to.y);
    });

    describe(`when from is in a group`, () => {
        const canvas = canvasFactory();
        const from = new fabric.Object({ left: Math.random(), top: Math.random() });
        const to = new fabric.Object({ left: Math.random(), top: Math.random() });
        const fromGroup = new fabric.Group([from], { left: Math.random(), top: Math.random() });

        connect(canvas, from, to);

        itDrawsALine(canvas, fromGroup.getCenterPoint(), to.getCenterPoint());
    });

    describe(`when to is in a group`, () => {
        const canvas = canvasFactory();
        const from = new fabric.Object({ left: Math.random(), top: Math.random() });
        const to = new fabric.Object({ left: Math.random(), top: Math.random() });
        const toGroup = new fabric.Group([to], { left: Math.random(), top: Math.random() });

        connect(canvas, from, to);

        itDrawsALine(canvas, from.getCenterPoint(), toGroup.getCenterPoint());
    });

    describe(`when both are in a group`, () => {
        const canvas = canvasFactory();
        const from = new fabric.Object({ left: Math.random(), top: Math.random() });
        const to = new fabric.Object({ left: Math.random(), top: Math.random() });
        const fromGroup = new fabric.Group([from], { left: Math.random(), top: Math.random() });
        const toGroup = new fabric.Group([to], { left: Math.random(), top: Math.random() });

        connect(canvas, from, to);

        itDrawsALine(canvas, fromGroup.getCenterPoint(), toGroup.getCenterPoint());
    });

    describe(`when neither is in a group`, () => {
        const canvas = canvasFactory();
        const from = new fabric.Object({ left: Math.random(), top: Math.random() });
        const to = new fabric.Object({ left: Math.random(), top: Math.random() });

        connect(canvas, from, to);

        itDrawsALine(canvas, from.getCenterPoint(), to.getCenterPoint());
    });
});