import { Title } from "../../../core/titles/Title";
import { Color } from "./Color";
import { connect } from "./connect";
import { titleFactory } from "./titleFactory";
import { fabric } from "fabric";

export const addTitleEquivalents = (
    canvas: fabric.Canvas,
    title: Title,
    comparison: Title | undefined,
    selected: fabric.Group,
    comparisonColor: Color,
    unselectedColor: Color,
    selectComparison: (title: Title) => void,
) => {
    const connectObjects = (from: fabric.Object, to: fabric.Object) => connect(canvas, from, to);
    const translateEquivalent = (equivalent: fabric.Group, index: number) => {
        equivalent.center();
        equivalent.top = selected.top;

        const offset = (index + 1) * 100;
        const origin = (selected.left ?? 0);

        if (index % 2 === 0) {
            equivalent.left = origin - offset;
        } else {
            equivalent.left = origin + offset;
        }

        equivalent.setCoords();
    }

    const equivalents = title.equivalentLevels
        .filter(l => l !== comparison)
        .map(l => ({ level: l, fabric: titleFactory(l, unselectedColor, selectComparison) }));
    if (comparison && title.equivalentLevels.some(l => l === comparison)) {
        equivalents.push({ level: comparison, fabric: titleFactory(comparison, comparisonColor) });
    }
    equivalents.sort((e1, e2) => e1.level.title.localeCompare(e2.level.title));

    canvas.add(...equivalents.map(e => e.fabric));
    selected.center().setCoords();
    equivalents
        .map(e => e.fabric)
        .forEach((e, i) => {
            translateEquivalent(e, i);
            connectObjects(selected.getObjects("circle")[0], e.getObjects("circle")[0]);
        });
}