import TitleComparison from "./TitleComparison";
import { Title } from "skills-matrix-server/src/domain/Title";
import { SkillLevel } from "skills-matrix-server/src/domain/SkillLevel";
import TitleSearch from "./TitleComparison/TitleSearch";
import TitleTree from "./TitleComparison/TitleTreeFragment";
import SkillsComparison from "./TitleComparison/SkillsComparison";
/*
jest.mock("../core/TitleTreeImpl", () => {
    const randomString = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    const skillLevelFactory = (categoryName: string, depth: number = 2): SkillLevel => ({
        skills: [
            randomString(),
            randomString(),
            randomString(),
        ],
    });
    const titleFactory = (): [string, Title] => {
        const title: Title = {
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
        };

        return [title.title, title];
    };

    const [title, root] = titleFactory();

    const titles = new Map<string, Title>([
        [title, root],
        titleFactory(),
        titleFactory(),
        titleFactory(),
        titleFactory(),
    ]);

    const tree = {
        root,
        titles
    };

    return {
        TitleTree: tree
    }
});

/* todo replace shallows with renders and mock inner components
describe(`<TitleComparison />`, () => {
    const comparison = shallow(<TitleComparison />);
    let titleSearch = comparison.find(TitleSearch);
    let titleTree = comparison.find(TitleTree);
    let skillComparison = comparison.find(SkillsComparison);

    const update = () => {
        titleSearch = comparison.find(TitleSearch);
        titleTree = comparison.find(TitleTree);
        skillComparison = comparison.find(SkillsComparison);
    }

    describe(`<TitleSearch />`, () => {
        it(`is supplied Titles as options`, () => {
            const titleOptions = titleSearch.props().titles;

            expect(titleOptions).toEqual([...Titles.titles.keys()]);
        });

        describe(`when a title is selected`, () => {
            let selectedTitle: Title;

            beforeEach(() => {
                const titleKeys = [...Titles.titles.keys()]
                selectedTitle = Titles.titles.get(titleKeys[Math.floor(Math.random() * titleKeys.length)])!;

                const selectTitle = titleSearch.props().titleSelected;

                selectTitle(selectedTitle!.title);
                update();
            });

            it(`is supplied the selected title`, () => {
                expect(titleSearch.props().title).toBe(selectedTitle!.title);
            });

            describe(`<TitleTree />`, () => {
                it(`is supplied the selected title`, () => {
                    expect(titleTree.props().title).toBe(selectedTitle);
                });

                describe(`when a comparison title is selected`, () => {
                    let comparisonTitle: Title;

                    beforeEach(() => {
                        const titleKeys = [...Titles.titles.keys()]
                        comparisonTitle = Titles.titles.get(titleKeys[Math.floor(Math.random() * titleKeys.length)])!;

                        const selectComparison = titleTree.props().selectComparison;

                        selectComparison(comparisonTitle);
                        update();
                    });

                    it(`is supplied that comparison title`, () => {
                        expect(titleTree.props().comparison).toBe(comparisonTitle);
                    });

                    describe(`<SkillsComparison />`, () => {
                        it(`is supplied that comparison title`, () => {
                            expect(skillComparison.props().titleComparison).toBe(comparisonTitle);
                        });
                    });
                });
            });

            describe(`<SkillsComparison />`, () => {
                it(`is supplied the selected title`, () => {
                    expect(skillComparison.props().titleSelected).toBe(selectedTitle);
                });
            });
        });
    });
});
*/