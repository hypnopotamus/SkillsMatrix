import { process } from "gremlin";
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
    const titleVertex = graph.addV('Title');
    if (title.track) titleVertex.property(single, 'track', title.track);
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
    const equivalentsLinked: Title[] = [];

    for (const { title, vertex } of titles) {
        for (const equivalent of title.equivalentLevels) {
            if (equivalentsLinked.includes(equivalent)) continue;

            const equivalentVertex = titles.find(t => t.title === equivalent).vertex;
            await graph.V(equivalentVertex.id).as('equivalent')
                .V(vertex.id).as('level')
                .addE('equivalent').from_('level').to('equivalent')
                .iterate();
        }
        equivalentsLinked.push(title);

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
        linkTitlesToSkills(titles)
    ]);
};