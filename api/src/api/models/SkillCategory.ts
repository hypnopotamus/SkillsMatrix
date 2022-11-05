import { ApiProperty } from '@nestjs/swagger';
import { SkillCategory as DomainSkillCategory } from "../../domain/SkillCategory";
import { SkillLevel } from './SkillLevel';

export class SkillCategory implements DomainSkillCategory {
  @ApiProperty({ type: String })
  readonly title: string;

  @ApiProperty({ type: () => SkillLevel, nullable: true })
  readonly levelOne?: SkillLevel;

  @ApiProperty({ type: () => SkillLevel, nullable: true })
  readonly levelTwo?: SkillLevel;

  @ApiProperty({ type: () => SkillLevel, nullable: true })
  readonly levelThree?: SkillLevel;

  @ApiProperty({ type: () => SkillLevel, nullable: true })
  readonly levelFour?: SkillLevel;

  @ApiProperty({ type: () => SkillLevel, nullable: true })
  readonly levelFive?: SkillLevel;

  @ApiProperty({ type: () => SkillLevel, nullable: true })
  readonly levelSix?: SkillLevel;

  @ApiProperty({ type: () => SkillLevel, nullable: true })
  readonly levelSeven?: SkillLevel;

  @ApiProperty({ type: () => SkillLevel, nullable: true })
  readonly levelEight?: SkillLevel;
}
