import { fabric } from "fabric";

export const connect = (canvas: fabric.Canvas, from: fabric.Object, to: fabric.Object) => {
    const fromAdjust = from.group
        ? (p: fabric.Point): fabric.Point => from.group!.getCenterPoint().add(p)
        : (p: fabric.Point): fabric.Point => p;
    const toAdjust = to.group
        ? (p: fabric.Point): fabric.Point => to.group!.getCenterPoint().add(p)
        : (p: fabric.Point): fabric.Point => p;
    const fromCoords = fromAdjust(from.getCenterPoint());
    const toCoords = toAdjust(to.getCenterPoint());
    const line = new fabric.Line([
        fromCoords.x, fromCoords.y,
        toCoords.x, toCoords.y
    ], {
        selectable: false,
        strokeWidth: 1,
        stroke: "grey",
    });

    canvas.add(line);
    line.sendToBack();
}