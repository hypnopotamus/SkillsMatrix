import { ClientFocus } from "../skills/ClientFocus";
import { DeliveryLeadership } from "../skills/DeliveryLeadership";
import { ProblemSolving } from "../skills/ProblemSolving";
import { NonRequirementsTrack } from "../skills/ProductManagement";
import { ProfessionalQualities } from "../skills/ProfessionalQualities";
import { Teamwork } from "../skills/Teamwork";
import { Technical } from "../skills/Technical";
import { Title } from "./Title";

export const TechnicalLead: Title = {
    title: "Technical Lead",
    nextLevels: [],
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
}