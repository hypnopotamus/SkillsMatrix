import { SkillLevel } from './SkillLevel';

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
