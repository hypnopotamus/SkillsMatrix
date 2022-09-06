import { Title } from "../../../domain/Title";
import { ClientFocus } from "../skills/ClientFocus";
import { DeliveryLeadership } from "../skills/DeliveryLeadership";
import { ProblemSolving } from "../skills/ProblemSolving";
import { NonRequirementsTrack } from "../skills/ProductManagement";
import { ProfessionalQualities } from "../skills/ProfessionalQualities";
import { Teamwork } from "../skills/Teamwork";
import { Technical } from "../skills/Technical";
import { SoftwareEngineer } from "./SoftwareEngineer";

export const SoftwareDeveloper: Title = {
    title: "Software Developer",
    nextLevels: [
        SoftwareEngineer
    ],
    skills: {
        professionalQualities: ProfessionalQualities.levelOne,
        clientFocus: ClientFocus.levelOne,
        problemSolving: ProblemSolving.levelOne,
        teamworkAndCollaboration: Teamwork.levelOne,
        deliveryLeadership: DeliveryLeadership.levelOne,
        technical: Technical.TechnicalSkills.levelOne,
        productManagement: NonRequirementsTrack.ProductManagement.levelOne
    },
    equivalentLevels: []
};