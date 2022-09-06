import { SkillCategory } from '../../../domain/SkillCategory';
import { SkillLevel } from '../../../domain/SkillLevel';

const levelFive: SkillLevel = {
  skills: [
    'Partners with Business Development to define the direction and strategy at the account.',
    'Identifies client expansion and revenue opportunities within an account and creates the plan and budget for new projects.',
    'Mentors and coaches Principal Consultants and Project Architects ',
    'Identifies new methodologies and processes useful to clients, formulates innovative ideas and solutions to solve client problems',
    'Participates in and helps organize and drive meet-ups and other activities.',
  ],
  nextLevel: undefined,
  previousLevels: [],
};

const levelFour: SkillLevel = {
  skills: [
    'Opens new accounts, creates roadmaps, and sets direction with the client, and prepares client for consultant onboarding',
    'Defines and implements project level standards, guidelines, and processes for a large project.',
    'Assists in the creation of internal materials, processes or infrastructure that can be used by NVISIA.',
    'Recognizes when staffing changes or additions are needed.',
    'Contributes deliverables, approach and estimates for statements of work.',
    'Negotiates vendor contracts and manages vendor relationship.',
    'Manages the project closeout process.',
    'Authors critical project artifacts ',
    'Actively participates in meet-ups, company technical discussions, and other marketing and internal gatherings ',
    'Manages the delivery-side of expectation management and goal achievement, estimates and tracks the project budget, monitors and manages project risks and resolves staffing issues.',
    'Collaborates with business development to create and present statements of work.',
    'Manages the career growth and promotion recommendation process for the project team.',
  ],
  nextLevel: levelFive,
  previousLevels: [],
};

const levelThree: SkillLevel = {
  skills: [
    'Can own the project initiation tasks for a project.',
    'Works with Product Owners, testing teams, and other client staff to ensure successful project delivery',
    'Identifies project delivery issues and offers possible solutions.',
    'Demonstrates mastery of agile processes and artifacts',
    'Creates a project roadmap and achieves overall buy-in with the client.',
    'Manages the project timeline, budget, and quality goals.',
    'Manages expectations through consistent communications with the client.',
    'Assists business development in outlining the deliverables and approach for statements of work. ',
    'Identifies and communicates with Business Development opportunities for account development ',
    'Oversees the design, configuration, development, integration and implementation of solutions on a large project or across multiple projects.',
  ],
  nextLevel: levelFour,
  previousLevels: [],
};

const levelTwo: SkillLevel = {
  skills: [
    'Performs the role of scrum-master when needed ',
    'Anticipates issues and delays and adjusts client expectations and team directives appropriately.',
    'Keeps the team on target for the overall goal while also solving the intermediary issues that arise',
    'Tracks and reports status and facilitates status meetings.',
    'Removes impediments to project progress',
    'Identifies and mitigates risks.',
  ],
  nextLevel: levelThree,
  previousLevels: [],
};

const levelOne: SkillLevel = {
  skills: [
    'Organizes work in a logical way and manages own workload.',
    'Manages time well and uses down time effectively.',
    'Generates clear and concise documentation.',
    'Appropropriately prioritizes tasks.',
    'Updates Project Leaders on work status, issues, and risks to meeting deadlines.',
    'Contributes to planning, estimation, & management of the project.',
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

export const DeliveryLeadership: SkillCategory = {
  title: 'Delivery Leadership Skills',
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
  DeliveryLeadership;
