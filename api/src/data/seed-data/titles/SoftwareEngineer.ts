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
import { TechnicalLead } from "./TechnicalLead";

export const SoftwareEngineer: Title = {
    title: "Software Engineer",
    track: [TechTrack, ProjectTrack],
    rank: Rank.Junior,
    nextLevels: [
        TechnicalLead
    ],
    skills: {
        [ProfessionalQualities.levelOne.category.title]: ProfessionalQualities.levelOne,
        [ClientFocus.levelOne.category.title]: ClientFocus.levelOne,
        [ProblemSolving.levelTwo.category.title]: ProblemSolving.levelTwo,
        [Teamwork.levelOne.category.title]: Teamwork.levelOne,
        [DeliveryLeadership.levelOne.category.title]: DeliveryLeadership.levelOne,
        [Technical.TechnicalSkills.levelTwo.category.title]: Technical.TechnicalSkills.levelTwo,
        [NonRequirementsTrack.ProductManagement.levelOne.category.title]: NonRequirementsTrack.ProductManagement.levelOne,
    },
    equivalentLevels: []
};

ProjectTrack.titles.push(SoftwareEngineer);
TechTrack.titles.push(SoftwareEngineer);