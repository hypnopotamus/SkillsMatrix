import { ClientFocus } from "../skills/ClientFocus";
import { DeliveryLeadership } from "../skills/DeliveryLeadership";
import { ProblemSolving } from "../skills/ProblemSolving";
import { NonRequirementsTrack } from "../skills/ProductManagement";
import { ProfessionalQualities } from "../skills/ProfessionalQualities";
import { Teamwork } from "../skills/Teamwork";
import { Technical } from "../skills/Technical";
import { TechnicalLead } from "./TechnicalLead";
import { Title } from "./Title";

export const SoftwareEngineer: Title = {
    title: "Software Engineer",
    nextLevels: [
        TechnicalLead
    ],
    skills: {
        professionalQualities: ProfessionalQualities.levelOne,
        clientFocus: ClientFocus.levelOne,
        problemSolving: ProblemSolving.levelTwo!,
        teamworkAndCollaboration: Teamwork.levelOne,
        deliveryLeadership: DeliveryLeadership.levelOne,
        technical: Technical.TechnicalSkills.levelTwo!,
        productManagement: NonRequirementsTrack.ProductManagement.levelOne
    },
    equivalentLevels: []
};