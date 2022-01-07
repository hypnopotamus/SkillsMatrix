import { SkillCategory } from "./SkillCategory";
import { SkillLevel } from "./SkillLevel";

const levelFive: SkillLevel = {
    skills: [
        "Guides the client's decision making process to resolve escalated issues.",
        "Recognizes and works to resolve the client's most pressing issues.",
        "Helps the team obtain the client/logistical resources needed to resolve client issues (e.g., third-party vendor introductions, etc.)"
    ],
    nextLevel: undefined,
    previousLevels: []
}

const levelFour: SkillLevel = {
    skills: [
        "Guides the client's decision making process to resolve escalated issues.",
        "Recognizes and works to resolve the client's most pressing issues.",
        "Helps the team obtain the client/logistical resources needed to resolve client issues (e.g., third-party vendor introductions, etc.)",
    ],
    nextLevel: levelFive,
    previousLevels: []
}

const levelThree: SkillLevel = {
    skills: [
        "Makes difficult decisions that may have wide-ranging impact to project success.",
        "Coaches team members to define solutions and supports the team in identifying and resolving difficult issues and risks that make the most sense for the client.",
        "Takes ambiguous problems or issues and provides clear, realistic options.",
        "Guides the client by proposing potential solutions and helping them understand the risks, advantages, or limitations of approaches.",
    ],
    nextLevel: levelFour,
    previousLevels: []
}

const levelTwo: SkillLevel = {
    skills: [
        "Uses consensus, when possible and appropriate.",
        "Anticipates the potential impact of decisions, including limitations.",
        "Anticipates issues, communicates them, and works to resolve them.",
        "Supports team members as they work through problems.",
    ],
    nextLevel: levelThree,
    previousLevels: []
}

const levelOne: SkillLevel = {
    skills: [
        "Clearly defines problems in a timely manner, breaks them down, and organizes them into logical parts.",
        "Understands underlying issues and asks clarifying questions.",
        "Separates unimportant details from key information.",
    ],
    nextLevel: levelTwo,
    previousLevels: []
}

levelOne.nextLevel!.previousLevels.push(...levelOne.previousLevels, levelOne);
levelTwo.nextLevel!.previousLevels.push(...levelTwo.previousLevels, levelTwo);
levelThree.nextLevel!.previousLevels.push(...levelThree.previousLevels, levelThree);
levelFour.nextLevel!.previousLevels.push(...levelFour.previousLevels, levelFour);

export const ProblemSolving: SkillCategory = {
    title: "Problem Solving",
    levelOne,
    levelTwo,
    levelThree,
    levelFour,
    levelFive
};