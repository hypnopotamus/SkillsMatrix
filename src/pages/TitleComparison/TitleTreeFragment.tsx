import { Title } from "../../core/titles/Title";
import { fabric } from "fabric";
import { useTheme } from "@mui/material/styles";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

interface props {
    readonly title?: Title;
    readonly comparison?: Title;
    readonly selectComparison: (title: Title) => void;
}

interface color {
    light: string;
    dark: string;
}

const titleFactory = (title: Title, color: color, onSelected?: (title: Title) => void): fabric.Group => {
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

const connect = (canvas: fabric.Canvas, from: fabric.Object, to: fabric.Object) => {
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

const addTitleEquivalents = (
    canvas: fabric.Canvas,
    title: Title,
    comparison: Title | undefined,
    selected: fabric.Group,
    comparisonColor: color,
    unselectedColor: color,
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

const addPromotions = (
    canvas: fabric.Canvas,
    title: Title,
    comparison: Title | undefined,
    comparisonColor: color,
    unselectedColor: color,
    selectComparison: (title: Title) => void,
) => {
    const connectObjects = (from: fabric.Object, to: fabric.Object) => connect(canvas, from, to);

    const promotions = title.nextLevels
        .filter(l => l !== comparison)
        .map(l => ({ from: title, level: l, fabric: titleFactory(l, unselectedColor, selectComparison) }));
    if (comparison && title.nextLevels.some(l => l === comparison)) {
        promotions.push({ from: title, level: comparison, fabric: titleFactory(comparison, comparisonColor) });
    }

    const equivalentPromotions = title.equivalentLevels.flatMap(l => l.nextLevels.map(n => ({ from: l, level: n })))
    promotions.push(
        ...equivalentPromotions
            .filter(l => l.level !== comparison)
            .map(l => ({ ...l, fabric: titleFactory(l.level, unselectedColor, selectComparison) }))
    );
    if (comparison && equivalentPromotions.some(p => p.level === comparison)) {
        const equivalentPromotion = equivalentPromotions.filter(p => p.level === comparison)[0];
        promotions.push({ ...equivalentPromotion, fabric: titleFactory(comparison, comparisonColor) });
    }

    promotions.sort((p1, p2) => p1.level.title.localeCompare(p2.level.title));

    canvas.add(...promotions.map(p => p.fabric));

    for (const level of [title, ...title.equivalentLevels]) {
        const sourceGroup = canvas
            .getObjects("group")
            .filter(o => o.data === level)
        [0] as fabric.Group;
        const promotionGroups = promotions
            .filter(p => p.from === level)
            .map(p => p.fabric);

        const setPromotionXPosition = promotionGroups.length % 2 === 0
            ? (promotion: fabric.Group, index: number) => {
                const offset = (index + 1) * 20;
                const origin = (sourceGroup.left ?? 0);

                if (index % 2 === 0) {
                    promotion.left = origin - offset;
                } else {
                    promotion.left = origin + offset;
                }
            }
            : (promotion: fabric.Group, index: number) => {
                const origin = (sourceGroup.left ?? 0);

                if (index === 0) {
                    promotion.left = origin;
                    return;
                }

                const offset = (index + 1) * 25;

                if (index % 2 === 0) {
                    promotion.left = origin - offset;
                } else {
                    promotion.left = origin + offset;
                }
            };

        promotionGroups.forEach((p, i) => {
            p.center()

            p.top = (sourceGroup.top ?? 0) - 100;
            setPromotionXPosition(p, i);
            connectObjects(sourceGroup.getObjects("circle")[0], p.getObjects("circle")[0])

            p.setCoords();
        });
    }
}

export const TitleTreeFragment = ({ title, comparison, selectComparison }: props) => {
    const { editor, onReady } = useFabricJSEditor();
    const theme = useTheme();

    if (!title) return null;

    const selectedColor = theme.palette.primary;
    const comparisonColor = theme.palette.secondary;
    const unselectedColor: color = {
        light: theme.palette.grey[300],
        dark: theme.palette.grey[600]
    }

    const canvas = editor?.canvas;

    editor?.addCircle()
    if (canvas) {
        canvas.setHeight(500);
        canvas.clear();
        const selected = titleFactory(title, selectedColor);
        canvas.add(selected);

        addTitleEquivalents(
            canvas,
            title,
            comparison,
            selected,
            comparisonColor,
            unselectedColor,
            selectComparison,
        );
        addPromotions(
            canvas,
            title,
            comparison,
            comparisonColor,
            unselectedColor,
            selectComparison,
        );
    }

    return <FabricJSCanvas onReady={onReady} />;
}

export default TitleTreeFragment;