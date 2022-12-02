import { CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Title } from "@skillsmatrix/api/src/domain/Title";
import { Configuration, DefaultApi, DefaultApiInterface, TitleRankEnum } from "../generated/skills";
import SkillsComparison from "./TitleComparison/SkillsComparison";
import TitleSearch from "./TitleComparison/TitleSearch";
import TitleTree from "./TitleComparison/TitleTreeFragment";
import { Mutable } from "utility-types";
import { Rank } from "@skillsmatrix/api/src/domain/Rank";
import { Track } from "@skillsmatrix/api/src/domain/Track";

const columns = (cols: number) => ({
    xl: cols,
    lg: cols,
    md: cols,
    sm: cols,
    xs: cols
});

const RankContractToDomain = (rank: TitleRankEnum): Rank => {
    switch (rank) {
        case TitleRankEnum.Director:
            return Rank.Director;
        case TitleRankEnum.Senior:
            return Rank.Senior;
        case TitleRankEnum.Junior:
            return Rank.Junior;
        default:
            throw new Error("index out of range" + rank);
    }
}

export const TitleComparison = () => {
    const [titles, setTitles] = useState<readonly Title[]>([]);
    const [titleSelected, selectTitle] = useState<Title>();
    const [titleComparison, selectComparison] = useState<Title>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //todo move data access out of the component
        (async () => {
            setLoading(true);
            const api: DefaultApiInterface = new DefaultApi(new Configuration({ basePath: "/api" }));
            const allTitles = await api.titleControllerGetAllTitles();
            const titleModels = await Promise.all(allTitles.map(t => api.titleControllerGetTitle({ id: t.id })));
            const titles: Mutable<Title & { readonly id: number }>[] = titleModels
                .map(t => ({
                    ...t,
                    track: [],
                    rank: RankContractToDomain(t.rank),
                    skills: Object.entries(t.skills).reduce((skills, skill) => ({ ...skills, [skill[0]]: skill[1] }), {}),
                    nextLevels: [],
                    equivalentLevels: []
                }));
            const trackModels = await Promise.all(titleModels
                .flatMap(m => m.track)
                .filter((t, i, ts) => ts.indexOf(t) === i)
                .map(({ id }) => api.trackControllerGetTrack({ id }))
            );
            const tracks: Mutable<Track & { readonly id: number }>[] = trackModels
                .map(t => ({
                    ...t,
                    titles: []
                }));
            for (const title of titles) {
                const model = titleModels.find(m => m.id === title.id);

                title.nextLevels = titles.filter(t => model?.nextLevels.map(l => l.id).includes(t.id));
                title.equivalentLevels = titles.filter(t => model?.equivalentLevels.map(l => l.id).includes(t.id));

                const titleTracks = tracks.filter(t => model?.track.map(tt => tt.id).includes(t.id));
                title.track = titleTracks;
                for (const track of titleTracks) {
                    track.titles = track.titles.concat(title);
                }
            }

            setTitles(titles);
            setLoading(false);
        })();
    }, [])

    return loading
        ? <CircularProgress />
        : <Grid container spacing={2} padding={2}>
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