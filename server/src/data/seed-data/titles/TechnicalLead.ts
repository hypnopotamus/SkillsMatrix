import { ClientFocus } from "../skills/ClientFocus";
import { DeliveryLeadership } from "../skills/DeliveryLeadership";
import { ProblemSolving } from "../skills/ProblemSolving";
import { NonRequirementsTrack } from "../skills/ProductManagement";
import { ProfessionalQualities } from "../skills/ProfessionalQualities";
import { Teamwork } from "../skills/Teamwork";
import { Technical } from "../skills/Technical";
import { ProjectLead } from "./ProjectLead";
import { TechnicalArchitect } from "./TechnicalArchitect";
import { Title } from "./Title";

export const TechnicalLead: Title = {
    title: "Technical Lead",
    nextLevels: [
        ProjectLead,
        TechnicalArchitect
    ],
    skills: {
        professionalQualities: ProfessionalQualities.levelOne,
        clientFocus: ClientFocus.levelTwo!,
        problemSolving: ProblemSolving.levelTwo!,
        teamworkAndCollaboration: Teamwork.levelTwo!,
        deliveryLeadership: DeliveryLeadership.levelOne,
        technical: Technical.TechnicalSkills.levelThree!,
        productManagement: NonRequirementsTrack.ProductManagement.levelOne
    },
    equivalentLevels: []
};