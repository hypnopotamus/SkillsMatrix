import { SkillLevel } from './SkillLevel';

//todo move the abstractions of the domain model to their own package
//the UI components generate clients for the open API spec
//then use these type definitions to reconstruct value objects to be rendered
//real behavior of domain objects belongs in the server but referencing the types
//to reconstruct the domain model shape and relationship out of API responses
//should be shared and elsewhere; the UI should not depend on nestjs implicitly
//by relying on the domain model abstractions
export interface SkillCategory {
  readonly title: string;
  readonly levelOne?: SkillLevel;
  readonly levelTwo?: SkillLevel;
  readonly levelThree?: SkillLevel;
  readonly levelFour?: SkillLevel;
  readonly levelFive?: SkillLevel;
  readonly levelSix?: SkillLevel;
  readonly levelSeven?: SkillLevel;
  readonly levelEight?: SkillLevel;
}
