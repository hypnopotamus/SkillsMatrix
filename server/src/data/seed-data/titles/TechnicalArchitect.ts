import { ClientFocus } from "../skills/ClientFocus";
import { DeliveryLeadership } from "../skills/DeliveryLeadership";
import { ProblemSolving } from "../skills/ProblemSolving";
import { NonRequirementsTrack } from "../skills/ProductManagement";
import { ProfessionalQualities } from "../skills/ProfessionalQualities";
import { Teamwork } from "../skills/Teamwork";
import { Technical } from "../skills/Technical";
import { ProjectLead } from "./ProjectLead";
import { SeniorTechnicalArchitect } from "./SeniorTechnicalArchitect";
import { Title } from "./Title";
import { Track } from "./Track";

export const TechnicalArchitect: Title = {
    title: "Technical Architect",
    track: Track.Technical,
    nextLevels: [
        SeniorTechnicalArchitect
    ],
    skills: {
        professionalQualities: ProfessionalQualities.levelTwo!,
        clientFocus: ClientFocus.levelTwo!,
        problemSolving: ProblemSolving.levelThree!,
        teamworkAndCollaboration: Teamwork.levelTwo!,
        deliveryLeadership: DeliveryLeadership.levelOne,
        technical: Technical.TechnicalSkills.levelFour!,
        productManagement: NonRequirementsTrack.ProductManagement.levelTwo!
    },
    equivalentLevels: []
};

if (ProjectLead) {
    TechnicalArchitect.equivalentLevels.push(ProjectLead);
    if (!ProjectLead.equivalentLevels.includes(TechnicalArchitect)) {
        ProjectLead.equivalentLevels.push(TechnicalArchitect);
    }
}