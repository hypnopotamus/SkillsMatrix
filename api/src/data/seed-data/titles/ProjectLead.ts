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
import { ProjectArchitect } from "./ProjectArchitect";
import { TechnicalArchitect } from "./TechnicalArchitect";

export const ProjectLead: Title = {
    title: "Project Lead",
    track: ProjectTrack,
    rank: Rank.Senior,
    nextLevels: [
        ProjectArchitect
    ],
    skills: {
        [ProfessionalQualities.levelTwo.category.title]: ProfessionalQualities.levelTwo,
        [ClientFocus.levelTwo.category.title]: ClientFocus.levelTwo,
        [ProblemSolving.levelThree.category.title]: ProblemSolving.levelThree,
        [Teamwork.levelTwo.category.title]: Teamwork.levelTwo,
        [DeliveryLeadership.levelTwo.category.title]: DeliveryLeadership.levelTwo,
        [Technical.TechnicalSkills.levelThree.category.title]: Technical.TechnicalSkills.levelThree,
        [NonRequirementsTrack.ProductManagement.levelTwo.category.title]: NonRequirementsTrack.ProductManagement.levelTwo,
    },
    equivalentLevels: []
};

ProjectTrack.titles.push(ProjectLead);

if (TechnicalArchitect) {
    ProjectLead.equivalentLevels.push(TechnicalArchitect);
    if (!TechnicalArchitect.equivalentLevels.includes(ProjectLead)) {
        TechnicalArchitect.equivalentLevels.push(ProjectLead);
    }
}