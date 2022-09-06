import { SkillLevel } from "./SkillLevel";
import { Track } from "./Track";

export interface Skills {
    readonly professionalQualities: SkillLevel;
    readonly clientFocus: SkillLevel;
    readonly problemSolving: SkillLevel;
    readonly teamworkAndCollaboration: SkillLevel;
    readonly deliveryLeadership: SkillLevel;
    readonly technical: SkillLevel;
    readonly productManagement: SkillLevel;
}

export interface Title {
    readonly title: string;
    readonly track?: Track;
    readonly skills: Skills;
    readonly nextLevels: Title[];
    readonly equivalentLevels: Title[];
}