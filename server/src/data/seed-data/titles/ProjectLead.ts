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
import { TechnicalArchitect } from "./TechnicalArchitect";

export const ProjectLead: Title = {
    title: "Project Lead",
    track: Track.Project,
    nextLevels: [
        ProjectArchitect
    ],
    skills: {
        professionalQualities: ProfessionalQualities.levelTwo!,
        clientFocus: ClientFocus.levelTwo!,
        problemSolving: ProblemSolving.levelThree!,
        teamworkAndCollaboration: Teamwork.levelTwo!,
        deliveryLeadership: DeliveryLeadership.levelTwo!,
        technical: Technical.TechnicalSkills.levelThree!,
        productManagement: NonRequirementsTrack.ProductManagement.levelTwo!
    },
    equivalentLevels: []
};

if (TechnicalArchitect) {
    ProjectLead.equivalentLevels.push(TechnicalArchitect);
    if (!TechnicalArchitect.equivalentLevels.includes(ProjectLead)) {
        TechnicalArchitect.equivalentLevels.push(ProjectLead);
    }
}