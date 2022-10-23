import { SkillLevel } from "./SkillLevel";
import { Track } from "./Track";

//todo move the abstractions of the domain model to their own package
export interface Title {
    readonly title: string;
    readonly track?: Track;
    readonly skills: Record<string, SkillLevel>;
    readonly nextLevels: Title[];
    readonly equivalentLevels: Title[];
}