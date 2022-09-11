import { SkillCategory } from '../../../domain/SkillCategory';
import { SkillLevel } from '../../../domain/SkillLevel';

export namespace RequirementsTrack {
  const levelSeven: SkillLevel = {
    skills: ['See Delivery Leadership Director'],
  };

  const levelSix: SkillLevel = {
    skills: [
      "Leads the effort to define the client's Agile/Scrum methodologies and processes, and then validates and monitors the implementation of the these processes within the Business and/or IT organizations at the client",
      'Perform Product Manager role at a client (understand the needs of external customers, idenitify the next features, define product roadmap, busines case analysis/definition, liason with the Product Owners, perform customer surveys, usability studies, liason with UI/UX teams, understand how things work from a technical perspective).',
      'Has mastered the application of various facilitation, requirements definition, analysis, change management, and quality control techniques and provides guidance to team members.',
    ],
  };

  const levelFive: SkillLevel = {
    skills: [
      'Can assist the client with the re-engineering business processes or the creation of new business processes.',
      'Performs Agile / Scrum / Product Management diagnostic (as a service offering).',
      'Looks at business requirements (Epics) and capabilities in the broader context to ensure alignment with business vision.',
      'Understands priorites, defines MVP, support the Agile teams in prioritization of stories from from a business/customer perspective.',
      'Defines and manages the defect process and change control board.',
      'Establishes and implements effective Agile teams',
      'Define and manage the testing (functional and user acceptance testing) processes.',
      'Be the Agile / process mentor and be able to tailor Agile methodolgy to the needs of each client.',
      'Perform Product Owner role at a client (liason with product manager and scrum team, determine overall priorities, communication with external stakeholders and teams, point person for issue resolution)',
      'Contributor to product roadmap, liason with UI/UX teams',
    ],
  };

  const levelFour: SkillLevel = {
    skills: [
      'Perform Scrum master role at a client (backlog management, sprint/iteration management, team velocity and burn down, capacity planning, issue/risk communication, retrospectives) ',
    ],
  };

  const levelThree: SkillLevel = {
    skills: [
      'Can lead the requirements gathering process for the project.',
      'Determines whether the requirements can be reasonably met within the current client technical environment.',
      'Explains and clarifies the content and intent of requirements documents (such as epics, features, stories) to the development and testing teams.',
      'Manages changes to backlog ',
      'Identifies other systems that may be impacted by changes to existing business processes.',
      'Recognizes areas where existing processes require re-engineering, or where new ones need to be developed.',
      'Manages the design, development, and execution of test plans/scripts.',
      'Assess and analyzes defects and determines how to address them; manages priority and backlog',
      'Manages/documents process maps, user personas, journey maps or other appropriate documents',
      'Develops subject matter expertise in Industry verticals and applies that knowledge to enhance effectiveness on client engagements.',
    ],
  };

  const levelTwo: SkillLevel = {
    skills: [
      'Determines and documents the needed user interface modifications or design for a specific feature or story ',
      'Develops, executes, and maintains test scripts.',
      'Defines new business processes that are the result of the new requirements.',
      'Leads requirements analysis and verification.',
      'Manages the review and inspection of epics, features, stories, workflow, wireframes/screen mockups.',
      'Obtains requirements using interviews, document analysis, requirements sessions, storyboards, surveys, site visits, business process descriptions, use cases, user stories, scenarios, event lists, business analysis, task and workflow analysis, and/or viewpoints.',
    ],
  };

  const levelOne: SkillLevel = {
    skills: [
      'document existing business processes.',
      'obtain requirements using various methods (e.g., interviews, document analysis, storyboards, jouney maps).',
      'break down high-level business and user requirements into useable epic, features and stories according to client & industry standards.',
    ],
  };

  export const ProductManagement: SkillCategory = {
    title: 'Product Management - Non-Requirements Track',
    levelOne,
    levelTwo,
    levelThree,
    levelFour,
    levelFive,
    levelSix,
    levelSeven,
  };

  levelOne.category =
    levelTwo.category =
    levelThree.category =
    levelFour.category =
    levelFive.category =
    levelSix.category =
    levelSeven.category =
    ProductManagement;
}

export namespace NonRequirementsTrack {
  const levelThree: SkillLevel = {
    skills: [
      'Can lead the requirements gathering process for the project.',
      'Determines whether the requirements can be reasonably met within the current client technical environment',
    ],
  };

  const levelTwo: SkillLevel = {
    skills: [
      'Transforms requirements into subsystem design based on project standards.',
      'Document user interfaces, test scenarios, processes (as-is/ to-be)',
      'Identify and document functional, system, service, and/or data requirements, under the direction of a PC or Product Manager.',
      'Is asking the right questions related to assigned tasks',
    ],
  };

  const levelOne: SkillLevel = {
    skills: [
      'Read and refine stories, ask approprriate technical questions, and implement the story',
      'Identifies, verifies, and tests user interfaces, test scenarios and processes',
    ],
  };

  export const ProductManagement: SkillCategory = {
    title: 'Product Management - Requirements Analyst',
    levelOne,
    levelTwo,
    levelThree,
  };

  levelOne.category =
    levelTwo.category =
    levelThree.category =
    ProductManagement;
}
