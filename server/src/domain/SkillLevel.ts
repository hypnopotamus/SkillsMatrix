import { SkillCategory } from './SkillCategory';

export const isSkillLevel = (level: SkillLevel | unknown): level is SkillLevel => typeof level === 'object' && 'skills' in level;

export interface SkillLevel {
  readonly skills: readonly string[];
  category?: SkillCategory;
}
