import { process } from "gremlin";
import { Track } from "src/domain/Track";
import { SkillLevel } from "../../../domain/SkillLevel";
import { Title } from "../../../domain/Title";
import { graph } from '../../gremlin';
import { ProjectArchitect } from "./ProjectArchitect";
import { ProjectLead } from "./ProjectLead";
import { SeniorTechnicalArchitect } from "./SeniorTechnicalArchitect";
import { SoftwareDeveloper } from "./SoftwareDeveloper";
import { SoftwareEngineer } from "./SoftwareEngineer";
import { TechnicalArchitect } from "./TechnicalArchitect";
import { TechnicalLead } from "./TechnicalLead";

const { cardinality: { single } } = process;

const seedTitle = async (title: Title, titles: any): Promise<{ readonly title: Title, readonly vertex: any }> => {
    const titleVertex = graph.addV('Title')
        .property(single, 'title', title.title)
        .property(single, 'rank', title.rank);
    const vertex = (await titleVertex.next()).value;

    await graph.V(vertex.id).as('title')
        .V(titles.id).as('titles')
        .addE('title').from_('titles').to('title')
        .iterate();

    return {
        title,
        vertex
    };
};

const linkTitles = async (titles: readonly { readonly title: Title, readonly vertex: any }[]) => {
    for (const { title, vertex } of titles) {
        for (const equivalent of title.equivalentLevels) {
            const equivalentVertex = titles.find(t => t.title === equivalent).vertex;
            await graph.V(equivalentVertex.id).as('equivalent')
                .V(vertex.id).as('level')
                .addE('equivalent').from_('level').to('equivalent')
                .iterate();
        }

        for (const nextLevel of title.nextLevels) {
            const nextLevelVertex = titles.find(t => t.title === nextLevel).vertex;

            await graph.V(nextLevelVertex.id).as('next')
                .V(vertex.id).as('level')
                .addE('next').from_('level').to('next')
                .iterate();
        }
    }
};

const linkTitlesToSkills = async (titles: readonly { readonly title: Title, readonly vertex: any }[]) => {
    for (const { title, vertex } of titles) {
        for (const skill of Object.values(title.skills) as SkillLevel[]) {
            await graph.V()
                .hasLabel('SkillLevel')
                .has('skills', skill.skills)
                .as('skill')
                .V(vertex.id).as('title')
                .addE(skill.category.title).from_('title').to('skill')
                .iterate();
        }
    }
};

const linkTitlesToTracks = async (titles: readonly { readonly title: Title, readonly vertex: any }[]) => {
    const linkToTrack = (title: any, track: Track) => graph.V()
        .hasLabel('Track')
        .has('name', track.name).as('track')
        .V(title.id).as('title')
        .addE('track').from_('title').to('track')
        .iterate();
    const linkToTitle = (track: Track, title: any) => graph.V()
        .hasLabel('Track')
        .has('name', track.name).as('track')
        .V(title.id).as('title')
        .addE('title').from_('track').to('title')
        .iterate();

    for (const { title, vertex } of titles) {
        if (Array.isArray(title.track)) {
            await Promise.all(title.track.map(t => linkToTrack(vertex, t)));
            await Promise.all(title.track.map(t => linkToTitle(t, vertex)));
        } else {
            await linkToTrack(vertex, title.track as Track);
            await linkToTitle(title.track as Track, vertex);
        }
    }
};

export const seedTitles = async () => {
    const allTitles = (await graph.addV('Titles').next()).value;

    const titles = await Promise.all([
        seedTitle(ProjectArchitect, allTitles),
        seedTitle(ProjectLead, allTitles),
        seedTitle(SeniorTechnicalArchitect, allTitles),
        seedTitle(SoftwareDeveloper, allTitles),
        seedTitle(SoftwareEngineer, allTitles),
        seedTitle(TechnicalArchitect, allTitles),
        seedTitle(TechnicalLead, allTitles)
    ]);

    await Promise.all([
        linkTitles(titles),
        linkTitlesToSkills(titles),
        linkTitlesToTracks(titles)
    ]);
};