import { Title } from "src/domain/Title";
import { Track } from "src/domain/Track";
import { graph } from "./gremlin";

export type TitleRecord = {
    [property in keyof Title]:
    Title[property] extends Title[] ? readonly number[]
    : Title[property] extends Title ? number
    : Title[property] extends Track | readonly Track[] ? number | number[]
    : Title[property]
} & {
    readonly id: number;
};

export interface TitleRepository {
    getTitles(): Promise<TitleRecord[]>;
    getTitle(id: number): Promise<TitleRecord>;
}

const hydrateTitle = async (title: any): Promise<TitleRecord> => {
    const { id } = title;

    const getSkill = async (type: string) => ({
        [type]: {
            skills: (await graph.V(id)
                .out(type)
                .values("skills")
                .next()
            ).value,
            category: {
                title: type
            }
        }
    });

    const getProperty = async (property: string) => (
        await graph.V(id)
            .values(property)
            .next()
    ).value;

    const getRelated = async (relation: string) => (
        await graph.V(id)
            .out(relation)
            .toList()
    ).map(l => (l as any).id);

    const [
        titleValue,
        rank,
        track,
        equivalentLevels,
        nextLevels,
        skills
    ] = await Promise.all([
        getProperty("title"),
        getProperty("rank"),
        getRelated("track"),
        getRelated("equivalent"),
        getRelated("next"),
        (await Promise.all(
            (await graph.V()
                .hasLabel("SkillCategory")
                .values("title")
                .toList()
            ).map(getSkill)
        )).reduce((s, skill) => ({ ...s, ...skill }), {})
    ]);

    return {
        id,
        title: titleValue,
        rank,
        track,
        equivalentLevels,
        nextLevels,
        skills
    };
};

export const TitleRepositoryImpl: TitleRepository = {
    getTitle: async (id: number) => await hydrateTitle(
        (
            await graph.V(id)
                .hasLabel("Title")
                //.valueMap()
                .next()
        ).value
    ),
    getTitles: async () => await Promise.all((
        await graph.V()
            .hasLabel("Title")
            .toList()
    ).map(hydrateTitle))
};