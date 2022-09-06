import { process } from 'gremlin';
import { graph } from '../../gremlin';
import { ClientFocus } from './ClientFocus';
import { DeliveryLeadership } from './DeliveryLeadership';
import { ProblemSolving } from './ProblemSolving';
import { NonRequirementsTrack, RequirementsTrack } from './ProductManagement';
import { ProfessionalQualities } from './ProfessionalQualities';
import { SkillCategory } from './SkillCategory';
import { isSkillLevel, SkillLevel } from './SkillLevel';
import { Teamwork } from './Teamwork';
import { NonTechnical, Technical } from './Technical';

const { cardinality: { single, list } } = process;

const seedLevels = async (category: SkillCategory, categoryVertex: any) => {
    const levels: { readonly level: SkillLevel, readonly vertex: any }[] = [];
    for (const level of Object.values(category).filter(isSkillLevel)) {
        levels.push({
            level,
            vertex: (
                await graph.addV('SkillLevel')
                    .property(list, 'skills', level.skills)
                    .next()
            ).value
        });
    }

    for (const { level, vertex } of levels) {
        await graph.V(vertex.id).as('level')
            .V(categoryVertex.id).as('category')
            .addE('level').from_('category').to('level')
            .iterate();

        if (level.nextLevel) {
            const nextLevel = levels.find(l => l.level === level.nextLevel).vertex;

            await graph
                .V(vertex.id).as('level')
                .V(nextLevel.id).as('next')
                .addE('next').from_('level').to('next')
                .addE('previous').from_('next').to('level')
                .iterate();
        }
    }
};

const seedCategory = async (skills: any, category: SkillCategory) => {
    const categoryVertext = (
        await graph.addV('SkillCategory').as('category')
            .property(single, 'title', category.title)
            .V(skills.id).as('skills')
            .addE('skill').from_('skills').to('category')
            .next()
    ).value;

    await seedLevels(
        category,
        categoryVertext
    );
};

export const seedSkills = async () => {
    const skills = (await graph.addV('Skills').next()).value;

    await Promise.all([
        seedCategory(skills, ClientFocus),
        seedCategory(skills, DeliveryLeadership),
        seedCategory(skills, ProblemSolving),
        seedCategory(skills, RequirementsTrack.ProductManagement),
        seedCategory(skills, NonRequirementsTrack.ProductManagement),
        seedCategory(skills, Teamwork),
        seedCategory(skills, Technical.TechnicalSkills),
        seedCategory(skills, NonTechnical.TechnicalSkills),
        seedCategory(skills, ProfessionalQualities)
    ]);
};
