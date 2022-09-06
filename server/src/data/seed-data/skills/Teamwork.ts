import { SkillCategory } from './SkillCategory';
import { SkillLevel } from './SkillLevel';

const levelFive: SkillLevel = {
  skills: [
    'Organizes and participates in company-wide culture, knowledge-share, and team building activities.',
  ],
  nextLevel: undefined,
  previousLevels: [],
};

const levelFour: SkillLevel = {
  skills: [
    'Knows the strengths and development needs of each team member and guides/coaches each person to perform at their best.',
    'Aligns and manages project resources based on skill and career grow needs.',
    'Creates a cohesive team environment.',
  ],
  nextLevel: levelFive,
  previousLevels: [],
};

const levelThree: SkillLevel = {
  skills: [
    'Develops team members via mentoring/coaching and sharing lessons learned.',
    'Delegates tasks and is able to step out of the details.',
    'Provides guidance and coaching  to improve performance.',
    'Motivates team members to perform at their best.',
  ],
  nextLevel: levelFour,
  previousLevels: [],
};

const levelTwo: SkillLevel = {
  skills: [
    'Provides day-to-day leadership to the team.',
    'Outlines tasks and can guide a small team.',
    'Provides timely, constructive feedback to team members.',
    'Recognizes team members.',
    'Mentors others and helps transition to the client or train the client as needed.',
    'Creates a dynamic at the client environment within which team members can perform at their best.',
  ],
  nextLevel: levelThree,
  previousLevels: [],
};

const levelOne: SkillLevel = {
  skills: [
    'Creates effective working relationships with NVISIA and client team members.',
    'Engages client staff in an appropriate manner. ',
    'Participates in Agile/Scrum team',
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
levelFour.nextLevel!.previousLevels.push(
  ...levelFour.previousLevels,
  levelFour,
);

export const Teamwork: SkillCategory = {
  title: 'Teamwork and Collaboration',
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
    Teamwork;
