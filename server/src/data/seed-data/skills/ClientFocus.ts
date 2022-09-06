import { SkillCategory } from '../../../domain/SkillCategory';
import { SkillLevel } from '../../../domain/SkillLevel';

const levelFour: SkillLevel = {
  skills: [
    'Builds strong, long-term relationships with client leadership and executive team.',
    'Develops a strong client network to leverage assistance on engagements and for opportunity development ',
    'Addresses client issues and concerns appropriately.',
    'Serves as the final client issue escalation point to ensure transparency and timely reaction.',
  ],
  nextLevel: undefined,
  previousLevels: [],
};

const levelThree: SkillLevel = {
  skills: [
    "Understands the client's business model and leverages the appropriate technology and design to support the business case or, depending on the role, support the leveraging of technologies.",
    'Sets realistic expectations with the client',
    'Ensures commitments are met and client is satisfied.',
    'Participates with account management team to manage the client relationship and the selling of future work.',
    "Viewed as the client's trusted advisor.",
  ],
  nextLevel: levelFour,
  previousLevels: [],
};

const levelTwo: SkillLevel = {
  skills: [
    'Contributes to discussions in client meetings and communications.',
    'Can manage and balance client priorities with good understanding of client capabilities.',
    'Considers the technical as well as the business challenges of the client. ',
    'Adapts approach to work within client environment constraints',
    'Develops appropriate client artifacts and communicates them effectively',
  ],
  nextLevel: levelThree,
  previousLevels: [],
};

const levelOne: SkillLevel = {
  skills: [
    'Builds confidence, trust and rapport with client personnel.',
    'Knows how the project fits into the client’s overall strategic goals - understands the big picture.',
    "Demonstrates commitment to clients' needs and goes above and beyond as needed.",
  ],
  nextLevel: levelTwo,
  previousLevels: [],
};

levelOne.nextLevel!.previousLevels.push(...levelOne.previousLevels, levelOne);
levelTwo.nextLevel!.previousLevels.push(...levelTwo.previousLevels, levelTwo);
levelThree.nextLevel!.previousLevels.push(
  ...levelThree.previousLevels,
  levelThree,
);

export const ClientFocus: SkillCategory = {
  title: 'Client Focus',
  levelOne,
  levelTwo,
  levelThree,
  levelFour,
};

levelOne.category =
  levelTwo.category =
  levelThree.category =
  levelFour.category =
  ClientFocus;
