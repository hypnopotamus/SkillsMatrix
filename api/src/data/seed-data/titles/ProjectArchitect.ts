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
import { SeniorTechnicalArchitect } from "./SeniorTechnicalArchitect";

export const ProjectArchitect: Title = {
    title: "Project Architect",
    track: ProjectTrack,
    rank: Rank.Senior,
    nextLevels: [],
    skills: {
        [ProfessionalQualities.levelThree.category.title]: ProfessionalQualities.levelThree,
        [ClientFocus.levelThree.category.title]: ClientFocus.levelThree,
        [ProblemSolving.levelThree.category.title]: ProblemSolving.levelThree,
        [Teamwork.levelThree.category.title]: Teamwork.levelThree,
        [DeliveryLeadership.levelThree.category.title]: DeliveryLeadership.levelThree,
        [Technical.TechnicalSkills.levelThree.category.title]: Technical.TechnicalSkills.levelThree,
        [NonRequirementsTrack.ProductManagement.levelTwo.category.title]: NonRequirementsTrack.ProductManagement.levelTwo,
    },
    equivalentLevels: []
};

ProjectTrack.titles.push(ProjectArchitect);

if (SeniorTechnicalArchitect) {
    ProjectArchitect.equivalentLevels.push(SeniorTechnicalArchitect);
    if (!SeniorTechnicalArchitect.equivalentLevels.includes(ProjectArchitect)) {
        SeniorTechnicalArchitect.equivalentLevels.push(ProjectArchitect);
    }
}