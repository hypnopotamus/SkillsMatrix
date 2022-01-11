import { Title } from "../../../core/titles/Title";
import { Color } from "./Color";
import { connect } from "./connect";
import { titleFactory } from "./titleFactory";
import { fabric } from "fabric";

export const addPromotions = (
    canvas: fabric.Canvas,
    title: Title,
    comparison: Title | undefined,
    comparisonColor: Color,
    unselectedColor: Color,
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