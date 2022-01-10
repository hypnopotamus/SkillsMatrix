import TitleSearch from "./TitleSearch";
import { v4 as randomString } from "uuid";
import { SkillLevel } from "../../core/skills/SkillLevel";
import { Title } from "../../core/titles/Title";
import { mount, shallow } from "enzyme";
import { Autocomplete, TextField, TextFieldProps } from "@mui/material";

const skillLevelFactory = (categoryName: string, depth: number = 2): SkillLevel => ({
    skills: [
        randomString(),
        randomString(),
        randomString(),
    ],
    nextLevel: depth > 0 ? skillLevelFactory(categoryName, depth - 1) : undefined,
    previousLevels: depth > 0
        ? [
            skillLevelFactory(categoryName, depth - 1),
            skillLevelFactory(categoryName, depth - 1)
        ]
        : [],
});
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

const titles = [
    titleFactory(),
    titleFactory(),
    titleFactory(),
    titleFactory(),
    titleFactory(),
];
const titleOptions = titles.map(t => t.title);

describe(`<TitleSearch />`, () => {
    describe(`when there is a title selected`, () => {
        const selectedTitle = titleOptions[Math.floor(Math.random() * titleOptions.length)];

        it(`is used as the value textbox value`, () => {
            const titleSearch = mount(<TitleSearch title={selectedTitle} titles={titleOptions} titleSelected={() => { }} />);

            const titleInput = titleSearch.find(TextField);
            var textValue = (titleInput.props() as TextFieldProps).inputProps.value;
            expect(textValue).toBe(selectedTitle);
        });
    });

    describe(`when there is not title selected`, () => {
        it(`the text box is empty`, () => {
            const titleSearch = mount(<TitleSearch titles={titleOptions} titleSelected={() => { }} />);

            const titleInput = titleSearch.find(TextField);
            var textValue = (titleInput.props() as TextFieldProps).inputProps.value;
            expect(textValue).toBeFalsy()
        });
    });

    describe(`when a title is selected`, () => {
        it(`invokes the supplied titleSelected function`, () => {
            const titleToSelect = titles[Math.floor(Math.random() * titleOptions.length)];
            let selectedTitle: Title | undefined;

            const titleSearch = shallow(<TitleSearch titles={titleOptions} titleSelected={s => selectedTitle = titles.find(t => t.title === s)} />);
            (titleSearch.find(Autocomplete).props() as any).onChange(null, titleToSelect.title);

            expect(selectedTitle).toBe(titleToSelect);
        });
    });
});