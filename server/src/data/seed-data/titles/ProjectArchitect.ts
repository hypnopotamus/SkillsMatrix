import { ClientFocus } from "../skills/ClientFocus";
import { DeliveryLeadership } from "../skills/DeliveryLeadership";
import { ProblemSolving } from "../skills/ProblemSolving";
import { NonRequirementsTrack } from "../skills/ProductManagement";
import { ProfessionalQualities } from "../skills/ProfessionalQualities";
import { Teamwork } from "../skills/Teamwork";
import { Technical } from "../skills/Technical";
import { SeniorTechnicalArchitect } from "./SeniorTechnicalArchitect";
import { Title } from "./Title";
import { Track } from "./Track";

export const ProjectArchitect: Title = {
    title: "Project Architect",
    track: Track.Project,
    nextLevels: [],
    skills: {
        professionalQualities: ProfessionalQualities.levelThree!,
        clientFocus: ClientFocus.levelThree!,
        problemSolving: ProblemSolving.levelThree!,
        teamworkAndCollaboration: Teamwork.levelThree!,
        deliveryLeadership: DeliveryLeadership.levelThree!,
        technical: Technical.TechnicalSkills.levelThree!,
        productManagement: NonRequirementsTrack.ProductManagement.levelTwo!
    },
    equivalentLevels: []
};

if (SeniorTechnicalArchitect) {
    ProjectArchitect.equivalentLevels.push(SeniorTechnicalArchitect);
    if (!SeniorTechnicalArchitect.equivalentLevels.includes(ProjectArchitect)) {
        SeniorTechnicalArchitect.equivalentLevels.push(ProjectArchitect);
    }
}