import { Rank } from "../../../domain/Rank";
import { Title } from "../../../domain/Title";
import { ClientFocus } from "../skills/ClientFocus";
import { DeliveryLeadership } from "../skills/DeliveryLeadership";
import { ProblemSolving } from "../skills/ProblemSolving";
import { NonRequirementsTrack } from "../skills/ProductManagement";
import { ProfessionalQualities } from "../skills/ProfessionalQualities";
import { Teamwork } from "../skills/Teamwork";
import { Technical } from "../skills/Technical";
import { ProjectTrack } from "../tracks/Project";
import { TechTrack } from "../tracks/Tech";
import { SoftwareEngineer } from "./SoftwareEngineer";

export const SoftwareDeveloper: Title = {
    title: "Software Developer",
    track: [TechTrack, ProjectTrack],
    rank: Rank.Junior,
    nextLevels: [
        SoftwareEngineer
    ],
    skills: {
        [ProfessionalQualities.levelOne.category.title]: ProfessionalQualities.levelOne,
        [ClientFocus.levelOne.category.title]: ClientFocus.levelOne,
        [ProblemSolving.levelOne.category.title]: ProblemSolving.levelOne,
        [Teamwork.levelOne.category.title]: Teamwork.levelOne,
        [DeliveryLeadership.levelOne.category.title]: DeliveryLeadership.levelOne,
        [Technical.TechnicalSkills.levelOne.category.title]: Technical.TechnicalSkills.levelOne,
        [NonRequirementsTrack.ProductManagement.levelOne.category.title]: NonRequirementsTrack.ProductManagement.levelOne,
    },
    equivalentLevels: []
};

ProjectTrack.titles.push(SoftwareDeveloper);
TechTrack.titles.push(SoftwareDeveloper);