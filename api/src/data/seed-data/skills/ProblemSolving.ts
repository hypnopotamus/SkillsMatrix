import { Mutable } from 'utility-types';
import { SkillCategory } from '../../../domain/SkillCategory';
import { SkillLevel } from '../../../domain/SkillLevel';

const levelFive: Mutable<SkillLevel> = {
  skills: [
    "Guides the client's decision making process to resolve escalated issues.",
    "Recognizes and works to resolve the client's most pressing issues.",
    'Helps the team obtain the client/logistical resources needed to resolve client issues (e.g., third-party vendor introductions, etc.)',
  ],
  category: null!
};

const levelFour: Mutable<SkillLevel> = {
  skills: [
    "Guides the client's decision making process to resolve escalated issues.",
    "Recognizes and works to resolve the client's most pressing issues.",
    'Helps the team obtain the client/logistical resources needed to resolve client issues (e.g., third-party vendor introductions, etc.)',
  ],
  category: null!
};

const levelThree: Mutable<SkillLevel> = {
  skills: [
    'Makes difficult decisions that may have wide-ranging impact to project success.',
    'Coaches team members to define solutions and supports the team in identifying and resolving difficult issues and risks that make the most sense for the client.',
    'Takes ambiguous problems or issues and provides clear, realistic options.',
    'Guides the client by proposing potential solutions and helping them understand the risks, advantages, or limitations of approaches.',
  ],
  category: null!
};

const levelTwo: Mutable<SkillLevel> = {
  skills: [
    'Uses consensus, when possible and appropriate.',
    'Anticipates the potential impact of decisions, including limitations.',
    'Anticipates issues, communicates them, and works to resolve them.',
    'Supports team members as they work through problems.',
  ],
  category: null!
};

const levelOne: Mutable<SkillLevel> = {
  skills: [
    'Clearly defines problems in a timely manner, breaks them down, and organizes them into logical parts.',
    'Understands underlying issues and asks clarifying questions.',
    'Separates unimportant details from key information.',
  ],
  category: null!
};

export const ProblemSolving: SkillCategory = {
  title: 'Problem Solving',
  levelOne,
  levelTwo,
  levelThree,
  levelFour,
  levelFive,
};

levelOne.category =
  levelTwo.category =
  levelThree.category =
  levelFour.category =
  levelFive.category =
  ProblemSolving;
