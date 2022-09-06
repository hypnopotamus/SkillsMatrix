import { SkillLevel } from './SkillLevel';

//todo relocate
//this isn't a seed-data its an application type
export interface SkillCategory {
  readonly title: string;
  readonly levelOne: SkillLevel;
  readonly levelTwo?: SkillLevel;
  readonly levelThree?: SkillLevel;
  readonly levelFour?: SkillLevel;
  readonly levelFive?: SkillLevel;
  readonly levelSix?: SkillLevel;
  readonly levelSeven?: SkillLevel;
  readonly levelEight?: SkillLevel;
}
