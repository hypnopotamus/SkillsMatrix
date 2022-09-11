import SkillsComparison from "./SkillsComparison";
import { render, screen } from '@testing-library/react';
import { Title } from "skills-matrix-server/src/domain/Title";
import { v4 as randomString } from "uuid";
import { SkillLevel } from "skills-matrix-server/src/domain/SkillLevel";
import { SkillCategory } from "skills-matrix-server/src/domain/SkillCategory";
/*
describe(`<SkillsComparison />`, () => {
    describe(`when no title is selected`, () => {
        it(`renders nothing`, () => {
            const { container } = render(<SkillsComparison />);

            //expect(container.firstChild).toBeNull();
        });
    });

    describe(`when a title is selected`, () => {
        const categoryFactory = (name: string, levelOne: SkillLevel): SkillCategory => ({
            title: name,
            levelOne,
        });
        const skillLevelFactory = (categoryName: string, depth: number = 2): SkillLevel => {
            const level: SkillLevel = {
                skills: [
                    randomString(),
                    randomString(),
                    randomString(),
                ],
            };

            level.category = categoryFactory(categoryName, level);

            return level;
        };
        const titleFactory = (): Title => ({
            title: randomString(),
            skills: {
                professionalQualities: skillLevelFactory("professionalQualities"),
                clientFocus: skillLevelFactory("clientFocus"),
                problemSolving: skillLevelFactory("problemSolving"),
                teamworkAndCollaboration: skillLevelFactory("teamworkAndCollaboration"),
                deliveryLeadership: skillLevelFactory("deliveryLeadership"),
                technical: skillLevelFactory("technical"),
                productManagement: skillLevelFactory("productManagement"),
            },
            nextLevels: [],
            equivalentLevels: []
        });
        const title = titleFactory();

        const isSkillLevel = (obj: any): obj is SkillLevel => Array.isArray(obj.skills) && obj.category;

        it(`renders the table headers for each category`, () => {
            render(<SkillsComparison titleSelected={title} />);

            const categories = Object.values(title.skills)
                .filter(isSkillLevel)
                .map(l => l.category!)
                .map(c => screen.queryByText(c.title));
            for (const category of categories) {
                expect(category).toBeInTheDocument();
            }
        });

        it(`renders the skill level skills under the heading`, () => {
            render(<SkillsComparison titleSelected={title} />);

            const headers = Object.values(title.skills)
                .filter(isSkillLevel)
                .map(l => l.category!)
                .map(c => ({ category: c, heading: screen.queryByText(c.title) }))
                .sort((h1, h2) => h1.heading!.tabIndex - h2.heading!.tabIndex);
            const columns = Object.values(title.skills)
                .filter(isSkillLevel)
                .map(l => ({ level: l, column: screen.queryByText(l.category!.levelOne.skills[0], { exact: false }) }))
                .sort((c1, c2) => c1.column!.tabIndex - c2.column!.tabIndex);
            headers.forEach((heading, i) => {
                const column = columns[i];
                expect(column.level.category?.title).toBe(heading.category.title);
            });
        });

        describe(`when no comparison is selected`, () => {
            it(`does not render the second row`, () => {
                render(<SkillsComparison titleSelected={title} />);

                const rowsCount = screen.queryAllByRole("row").length;
                const skillCount = Object.values(title.skills)
                    .filter(isSkillLevel)
                    .length;
                const headerCount = screen.queryAllByRole("columnheader").length / skillCount;
                expect(rowsCount - headerCount).toBe(1);
            });
        });

        describe(`when a comparison is selected`, () => {
            const comparison = titleFactory();

            it(`renders the comparison skill level skills under the heading`, () => {
                render(<SkillsComparison titleSelected={title} titleComparison={comparison} />);

                const headers = Object.values(title.skills)
                    .filter(isSkillLevel)
                    .map(l => l.category!)
                    .map(c => ({ category: c, heading: screen.queryByText(c.title) }))
                    .sort((h1, h2) => h1.heading!.tabIndex - h2.heading!.tabIndex);
                const columns = Object.values(comparison.skills)
                    .filter(isSkillLevel)
                    .map(l => ({ level: l, column: screen.queryByText(l.category!.levelOne.skills[0], { exact: false }) }))
                    .sort((c1, c2) => c1.column!.tabIndex - c2.column!.tabIndex);
                headers.forEach((heading, i) => {
                    const column = columns[i];
                    expect(column.level.category?.title).toBe(heading.category.title);
                });
            });
        });
    });
});
*/