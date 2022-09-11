import { Title } from "../../../domain/Title";
import { Track } from "../../../domain/Track";
import { ClientFocus } from "../skills/ClientFocus";
import { DeliveryLeadership } from "../skills/DeliveryLeadership";
import { ProblemSolving } from "../skills/ProblemSolving";
import { NonRequirementsTrack } from "../skills/ProductManagement";
import { ProfessionalQualities } from "../skills/ProfessionalQualities";
import { Teamwork } from "../skills/Teamwork";
import { Technical } from "../skills/Technical";
import { ProjectArchitect } from "./ProjectArchitect";

export const SeniorTechnicalArchitect: Title = {
    title: "Senior Technical Architect",
    track: Track.Technical,
    nextLevels: [],
    skills: {
        [ProfessionalQualities.levelThree.category.title]: ProfessionalQualities.levelThree,
        [ClientFocus.levelThree.category.title]: ClientFocus.levelThree,
        [ProblemSolving.levelThree.category.title]: ProblemSolving.levelThree,
        [Teamwork.levelThree.category.title]: Teamwork.levelThree,
        [DeliveryLeadership.levelTwo.category.title]: DeliveryLeadership.levelTwo,
        [Technical.TechnicalSkills.levelFive.category.title]: Technical.TechnicalSkills.levelFive,
        [NonRequirementsTrack.ProductManagement.levelTwo.category.title]: NonRequirementsTrack.ProductManagement.levelTwo,
    },
    equivalentLevels: []
};

if (ProjectArchitect) {
    SeniorTechnicalArchitect.equivalentLevels.push(ProjectArchitect);
    if (!ProjectArchitect.equivalentLevels.includes(SeniorTechnicalArchitect)) {
        ProjectArchitect.equivalentLevels.push(SeniorTechnicalArchitect);
    }
}