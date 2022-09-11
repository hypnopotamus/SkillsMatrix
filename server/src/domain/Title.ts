import { SkillLevel } from "./SkillLevel";
import { Track } from "./Track";

export interface Title {
    readonly title: string;
    readonly track?: Track;
    readonly skills: Record<string, SkillLevel>;
    readonly nextLevels: Title[];
    readonly equivalentLevels: Title[];
}