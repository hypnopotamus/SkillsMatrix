import { SkillLevel } from "../skills/SkillLevel";
import { Track } from "./Track";

//todo relocate
//this isn't a seed-data its an application type
export interface Skills {
    readonly professionalQualities: SkillLevel;
    readonly clientFocus: SkillLevel;
    readonly problemSolving: SkillLevel;
    readonly teamworkAndCollaboration: SkillLevel;
    readonly deliveryLeadership: SkillLevel;
    readonly technical: SkillLevel;
    readonly productManagement: SkillLevel;
}

//todo relocate
//this isn't a seed-data its an application type
export interface Title {
    readonly title: string;
    readonly track?: Track;
    readonly skills: Skills;
    readonly nextLevels: Title[];
    readonly equivalentLevels: Title[];
}