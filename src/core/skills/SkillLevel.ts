export interface SkillLevel {
    readonly skills: readonly string[];
    readonly nextLevel?: SkillLevel;
    readonly previousLevels: SkillLevel[];
}