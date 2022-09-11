import { SkillCategory } from '../../../domain/SkillCategory';
import { SkillLevel } from '../../../domain/SkillLevel';

export namespace Technical {
  const levelEight: SkillLevel = {
    skills: ['Provides strategic thought leadership to capability areas'],
  };

  const levelSeven: SkillLevel = {
    skills: [
      "Identifies and validates new technologies that can be useful to clients, formulates innovative ideas and solutions to solve a client's problem. ",
      'Brings innovative technologies to clients and engages clients in concepts and strategies related to the technologies. ',
      "Leads the effort to define the client's technical direction and then validates and monitors the implementation of the solution. ",
      'Leads the team in applying the vision for how to implement a technical solution.',
      'Handles the advanced architecture and design for all projects at the client.',
      'Should have mastered the application of various architectural styles and integration patterns and provides guidance to team members. ',
    ],
  };

  const levelSix: SkillLevel = {
    skills: [
      'Has a solid vision for how a part of the technical solution should run and is able to guide others.',
    ],
  };

  const levelFive: SkillLevel = {
    skills: [
      'Starts to shape a vision for how a part of the technical solution should run (e.g., coding standards, design, implementation).',
    ],
  };

  const levelFour: SkillLevel = {
    skills: [
      'Defines and implements project level technical standards, guidelines, and architectures for a large project, illustrating mastery of design patterns and practices.',
      'Shows capacity to apply various architecture styles and integration patterns.',
      'Performs architecture reviews.',
      'Drives technical risk requirement activities on projects with a high degree of technical scale or complexity.',
      'Designs the system/architecture based on the defined requirements for systems with a high degree of complexity.',
      'Technical expertise expands to multiple technologies, frameworks, systems.',
      'Drives technical risk requirement activities on projects with a high degree of technical scale or complexity.',
      'Can design a solution and oversee the technical deliverables of the team for accuracy while suggesting areas of improvement.',
    ],
  };

  const levelThree: SkillLevel = {
    skills: [
      'Provides day-to-day technical leadership to developer(s) and helps outline team priorities.',
      'May be primary technical liaison for the project teams.',
      'Understands emerging technologies and adopts them quickly.',
      'Defines and implements project level technical standards, guidelines, architectures and processes for a small project.',
      'Showing mastery of implementation patterns and is providing practical guidance for design patterns.',
      'Balances technical leadership responsibilities with individual task completion.',
      'Performs design reviews.',
      'Designs the system/architecture based on the defined requirements.',
    ],
  };

  const levelTwo: SkillLevel = {
    skills: [
      'Tests (develops and conducts) and implements the subsystem.',
      'Assists in establishing project design standards.',
      'Mastery of implementation patterns and practices applying good design patterns and practices.',
      'Performs code reviews.',
    ],
  };

  const levelOne: SkillLevel = {
    skills: [
      'Designs and develops software with little direction.',
      'Writes high quality, reusable, code.',
      'Executes system and unit tests.',
    ],
  };

  export const TechnicalSkills: SkillCategory = {
    title: 'Technical Skills - Technical track',
    levelOne,
    levelTwo,
    levelThree,
    levelFour,
    levelFive,
    levelSix,
    levelSeven,
    levelEight,
  };

  levelOne.category =
    levelTwo.category =
    levelThree.category =
    levelFour.category =
    levelFive.category =
    levelSix.category =
    levelSeven.category =
    levelEight.category =
    TechnicalSkills;
}

export namespace NonTechnical {
  const levelThree: SkillLevel = {
    skills: [
      'Understands the intended business data model and how it will be implemented.',
      'Understands system-level requirements and overall data process flow.',
      'Outlines upfront deliverables and estimates for project work.',
    ],
  };

  const levelTwo: SkillLevel = {
    skills: [
      'Communicate effectively with technical and non-technical resources',
      'Understand system architecture and data flow diagrams',
    ],
  };

  const levelOne: SkillLevel = {
    skills: [
      'Execute system, usability, or functional tests',
      'Able to understand the data in the system using the existing system interface.',
      "Able to 'read' code",
    ],
  };

  export const TechnicalSkills: SkillCategory = {
    title: 'Technical Skills - Non-Technical track',
    levelOne,
    levelTwo,
    levelThree,
  };

  levelOne.category = levelTwo.category = levelThree.category = TechnicalSkills;
}
