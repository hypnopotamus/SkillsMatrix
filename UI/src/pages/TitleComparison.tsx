import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Title } from "skills-matrix-server/src/domain/Title";
import { Track } from "skills-matrix-server/src/domain/Track";
import { Configuration, DefaultApi, DefaultApiInterface } from "../generated/skills";
import SkillsComparison from "./TitleComparison/SkillsComparison";
import TitleSearch from "./TitleComparison/TitleSearch";
import TitleTree from "./TitleComparison/TitleTreeFragment";
import { Mutable } from "utility-types";

const columns = (cols: number) => ({
    xl: cols,
    lg: cols,
    md: cols,
    sm: cols,
    xs: cols
})

export const TitleComparison = () => {
    const [titles, setTitles] = useState<readonly Title[]>([]);
    const [titleSelected, selectTitle] = useState<Title>();
    const [titleComparison, selectComparison] = useState<Title>();

    useEffect(() => {
        //todo move data access out of the component
        (async () => {
            const api: DefaultApiInterface = new DefaultApi(new Configuration({ basePath: "http://localhost:3000" }));
            const allTitles = await api.titleControllerGetAllTitles();
            const titleModels = (await Promise.all(allTitles.map(async t => await api.titleControllerGetTitle({ id: t.id }))));
            const titles: Mutable<Title & { readonly id: number }>[] = titleModels
                .map(t => ({
                    ...t,
                    track: t.track === "Project" ? Track.Project
                        : t.track === "Technical" ? Track.Technical
                            : undefined,
                    skills: Object.entries(t.skills).reduce((skills, skill) => ({ ...skills, [skill[0]]: skill[1] }), {}),
                    nextLevels: [],
                    equivalentLevels: []
                }));
            for (const title of titles) {
                const model = titleModels.find(m => m.id === title.id);

                title.nextLevels = titles.filter(t => model?.nextLevels.map(l => l.id).includes(t.id))
                title.equivalentLevels = titles.filter(t => model?.equivalentLevels.map(l => l.id).includes(t.id))
            }

            setTitles(titles);
        })();
    }, [])

    return <Grid container spacing={2} padding={2}>
        <Grid item {...columns(3)}>
            <TitleSearch title={titleSelected?.title} titles={titles.map(t => t.title)} titleSelected={s => { selectTitle(titles.find(t => t.title === s)); selectComparison(undefined); }} />
        </Grid>
        <Grid container spacing={2} padding={2}>
            <Grid item {...columns(2)}>
                <TitleTree title={titleSelected} comparison={titleComparison} selectComparison={selectComparison} />
            </Grid>
            <Grid item {...columns(10)}>
                <SkillsComparison titleSelected={titleSelected} titleComparison={titleComparison} />
            </Grid>
        </Grid>
    </Grid>;
}

export default TitleComparison;