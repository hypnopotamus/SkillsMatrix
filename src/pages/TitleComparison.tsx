import { Grid } from "@mui/material";
import { useState } from "react"
import { Title } from "../core/titles/Title";
import { TitleTree as Titles } from "../core/TitleTreeImpl";
import SkillsComparison from "./TitleComparison/SkillsComparison";
import TitleSearch from "./TitleComparison/TitleSearch";
import TitleTree from "./TitleComparison/TitleTreeFragment";

const columns = (cols: number) => ({
    xl: cols,
    lg: cols,
    md: cols,
    sm: cols,
    xs: cols
})

export const TitleComparison = () => {
    const [titleSelected, selectTitle] = useState<Title>();
    const [titleComparison, selectComparison] = useState<Title>();

    return <Grid container spacing={2} padding={2}>
        <Grid item {...columns(3)}>
            <TitleSearch title={titleSelected?.title} titles={[...Titles.titles.keys()]} titleSelected={s => {selectTitle(Titles.titles.get(s)); selectComparison(undefined);}} />
        </Grid>
        <Grid container spacing={2} padding={2}>
            <Grid item {...columns(2)}>
                <TitleTree title={titleSelected} comparison={titleComparison} selectComparison={selectComparison} />
            </Grid>
            <Grid item {...columns(10)}>
                <SkillsComparison titleSelected={titleSelected} titleComparison={titleComparison}/>
            </Grid>
        </Grid>
    </Grid>;
}

export default TitleComparison;