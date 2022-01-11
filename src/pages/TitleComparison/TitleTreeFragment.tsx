import { Title } from "../../core/titles/Title";
import { useTheme } from "@mui/material/styles";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { Color } from "./titleTree/Color";
import { titleFactory } from "./titleTree/titleFactory";
import { addTitleEquivalents } from "./titleTree/addTitleEquivalents";
import { addPromotions } from "./titleTree/addPromotions";

interface props {
    readonly title?: Title;
    readonly comparison?: Title;
    readonly selectComparison: (title: Title) => void;
}

export const TitleTreeFragment = ({ title, comparison, selectComparison }: props) => {
    const { editor, onReady } = useFabricJSEditor();
    const theme = useTheme();

    if (!title) return null;

    const selectedColor = theme.palette.primary;
    const comparisonColor = theme.palette.secondary;
    const unselectedColor: Color = {
        light: theme.palette.grey[300],
        dark: theme.palette.grey[600]
    }

    const canvas = editor?.canvas;
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