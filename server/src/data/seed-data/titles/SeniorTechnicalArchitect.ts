import { ClientFocus } from "../skills/ClientFocus";
import { DeliveryLeadership } from "../skills/DeliveryLeadership";
import { ProblemSolving } from "../skills/ProblemSolving";
import { NonRequirementsTrack } from "../skills/ProductManagement";
import { ProfessionalQualities } from "../skills/ProfessionalQualities";
import { Teamwork } from "../skills/Teamwork";
import { Technical } from "../skills/Technical";
import { ProjectArchitect } from "./ProjectArchitect";
import { Title } from "./Title";
import { Track } from "./Track";

export const SeniorTechnicalArchitect: Title = {
    title: "Senior Technical Architect",
    track: Track.Technical,
    nextLevels: [],
    skills: {
        professionalQualities: ProfessionalQualities.levelThree!,
        clientFocus: ClientFocus.levelThree!,
        problemSolving: ProblemSolving.levelThree!,
        teamworkAndCollaboration: Teamwork.levelThree!,
        deliveryLeadership: DeliveryLeadership.levelTwo!,
        technical: Technical.TechnicalSkills.levelFive!,
        productManagement: NonRequirementsTrack.ProductManagement.levelTwo!
    },
    equivalentLevels: []
};

if (ProjectArchitect) {
    SeniorTechnicalArchitect.equivalentLevels.push(ProjectArchitect);
    if (!ProjectArchitect.equivalentLevels.includes(SeniorTechnicalArchitect)) {
        ProjectArchitect.equivalentLevels.push(SeniorTechnicalArchitect);
    }
}