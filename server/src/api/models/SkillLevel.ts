import { ApiProperty } from '@nestjs/swagger';
import { SkillLevel as DomainSkillLevel } from "../../domain/SkillLevel";
import { SkillCategory } from './SkillCategory';

export class SkillLevel implements DomainSkillLevel {
  @ApiProperty({ type: [String] })
  readonly skills: readonly string[];

  @ApiProperty({ type: SkillCategory, nullable: true })
  readonly category: SkillCategory;
}
