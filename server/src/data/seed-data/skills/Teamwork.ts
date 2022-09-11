import { SkillCategory } from '../../../domain/SkillCategory';
import { SkillLevel } from '../../../domain/SkillLevel';

const levelFive: SkillLevel = {
  skills: [
    'Organizes and participates in company-wide culture, knowledge-share, and team building activities.',
  ],
};

const levelFour: SkillLevel = {
  skills: [
    'Knows the strengths and development needs of each team member and guides/coaches each person to perform at their best.',
    'Aligns and manages project resources based on skill and career grow needs.',
    'Creates a cohesive team environment.',
  ],
};

const levelThree: SkillLevel = {
  skills: [
    'Develops team members via mentoring/coaching and sharing lessons learned.',
    'Delegates tasks and is able to step out of the details.',
    'Provides guidance and coaching  to improve performance.',
    'Motivates team members to perform at their best.',
  ],
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
};

const levelOne: SkillLevel = {
  skills: [
    'Creates effective working relationships with NVISIA and client team members.',
    'Engages client staff in an appropriate manner. ',
    'Participates in Agile/Scrum team',
  ],
};

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
