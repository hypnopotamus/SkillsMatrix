import { fabric } from "fabric";
import { Title } from "skills-matrix-server/src/domain/Title";
import { Color } from "./Color";

export const titleFactory = (title: Title, color: Color, onSelected?: (title: Title) => void): fabric.Group => {
    const titleCircle = new fabric.Circle({
        radius: 10,
        fill: color.light,
        stroke: color.dark,
    });
    const titleLabel = new fabric.Textbox(title?.title, {
        textAlign: "center",
        fontSize: 12,
        width: 16,
        top: ((titleCircle.radius ?? 0) * 2) + 5,
        left: -8,
    });

    var titleGroup = new fabric.Group([
        titleLabel,
        titleCircle
    ], {
        selectable: onSelected != null,
        hoverCursor: onSelected != null ? "pointer" : "default",
        data: title,
    });

    if (onSelected) {
        titleGroup.onSelect = () => {
            onSelected(title);

            return true;
        }
    }

    return titleGroup;
}