import { SkillCategory } from '../../../domain/SkillCategory';
import { SkillLevel } from '../../../domain/SkillLevel';

const levelFour: SkillLevel = {
  skills: [
    "Participates in meetups, conferences, blogs, etc. as a representative of NVISIA's thought leadership",
    'Keeps current with the latest domain and industry related trends.',
    'Helps define the solutions NVISIA offers to clients and identifies the skills we need to develop in our employees.',
    'Can take on multiple roles given the project needs ',
    'Leverages past client experiences to guide and inform project delivery',
    'Establishes and promotes consultant norms that conform to client standards',
  ],
};

const levelThree: SkillLevel = {
  skills: [
    'Recognizes different communication styles and adjusts own style accordingly.   ',
    'Clear understanding of client organizational makeup and utilizes effective channels for communication',
    'Is able to share technical information with a non-technical audience.',
    'Communicates, interfaces, and presents to client senior executives, client Architecture and Operations other stakeholder groups.',
    'Manages and facilitates project team and client meetings as needed.',
    'Demonstrates innovation in delivery approach',
  ],
};

const levelTwo: SkillLevel = {
  skills: [
    'Adapts to client cultures and navigate client politics including situations which include conflict or differing points of view.',
    'Coaches and guides others on how to handle challenging consulting situations.',
    'Able to be responsible for many and differing tasks.',
    'Creates and delivers presentations to the client',
    'Pursues education on relevant technologies/skills that can be leveraged with our clients',
  ],
};

const levelOne: SkillLevel = {
  skills: [
    'Speaks and writes clearly and concisely.',
    'Actively listens to the points of view, ideas, and concerns of others.',
    'Is appropriately diplomatic (knows what to say/not to say).',
    'Manages stress well and stays focused under pressure.',
    'Turns mistakes into learning opportunities.',
    'Keeps current on trends and learns new skills.',
    'Welcomes and supports change.',
    'Is innovative.',
  ],
};

export const ProfessionalQualities: SkillCategory = {
  title: 'Consultant Professional Qualities',
  levelOne,
  levelTwo,
  levelThree,
  levelFour,
};

levelOne.category =
  levelTwo.category =
  levelThree.category =
  levelFour.category =
  ProfessionalQualities;
