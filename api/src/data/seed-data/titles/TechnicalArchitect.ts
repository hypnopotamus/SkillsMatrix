import { Rank } from "../../../domain/Rank";
import { Title } from "../../../domain/Title";
import { ClientFocus } from "../skills/ClientFocus";
import { DeliveryLeadership } from "../skills/DeliveryLeadership";
import { ProblemSolving } from "../skills/ProblemSolving";
import { NonRequirementsTrack } from "../skills/ProductManagement";
import { ProfessionalQualities } from "../skills/ProfessionalQualities";
import { Teamwork } from "../skills/Teamwork";
import { Technical } from "../skills/Technical";
import { TechTrack } from "../tracks/Tech";
import { ProjectLead } from "./ProjectLead";
import { SeniorTechnicalArchitect } from "./SeniorTechnicalArchitect";

export const TechnicalArchitect: Title = {
    title: "Technical Architect",
    track: TechTrack,
    rank: Rank.Senior,
    nextLevels: [
        SeniorTechnicalArchitect
    ],
    skills: {
        [ProfessionalQualities.levelTwo.category.title]: ProfessionalQualities.levelTwo,
        [ClientFocus.levelTwo.category.title]: ClientFocus.levelTwo,
        [ProblemSolving.levelThree.category.title]: ProblemSolving.levelThree,
        [Teamwork.levelTwo.category.title]: Teamwork.levelTwo,
        [DeliveryLeadership.levelOne.category.title]: DeliveryLeadership.levelOne,
        [Technical.TechnicalSkills.levelFour.category.title]: Technical.TechnicalSkills.levelFour,
        [NonRequirementsTrack.ProductManagement.levelTwo.category.title]: NonRequirementsTrack.ProductManagement.levelTwo,
    },
    equivalentLevels: []
};

TechTrack.titles.push(TechnicalArchitect);

if (ProjectLead) {
    TechnicalArchitect.equivalentLevels.push(ProjectLead);
    if (!ProjectLead.equivalentLevels.includes(TechnicalArchitect)) {
        ProjectLead.equivalentLevels.push(TechnicalArchitect);
    }
}