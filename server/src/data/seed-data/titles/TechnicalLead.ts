import { Title } from "../../../domain/Title";
import { ClientFocus } from "../skills/ClientFocus";
import { DeliveryLeadership } from "../skills/DeliveryLeadership";
import { ProblemSolving } from "../skills/ProblemSolving";
import { NonRequirementsTrack } from "../skills/ProductManagement";
import { ProfessionalQualities } from "../skills/ProfessionalQualities";
import { Teamwork } from "../skills/Teamwork";
import { Technical } from "../skills/Technical";
import { ProjectLead } from "./ProjectLead";
import { TechnicalArchitect } from "./TechnicalArchitect";

export const TechnicalLead: Title = {
    title: "Technical Lead",
    nextLevels: [
        ProjectLead,
        TechnicalArchitect
    ],
    skills: {
        [ProfessionalQualities.levelOne.category.title]: ProfessionalQualities.levelOne,
        [ClientFocus.levelTwo.category.title]: ClientFocus.levelTwo,
        [ProblemSolving.levelTwo.category.title]: ProblemSolving.levelTwo,
        [Teamwork.levelTwo.category.title]: Teamwork.levelTwo,
        [DeliveryLeadership.levelOne.category.title]: DeliveryLeadership.levelOne,
        [Technical.TechnicalSkills.levelThree.category.title]: Technical.TechnicalSkills.levelThree,
        [NonRequirementsTrack.ProductManagement.levelOne.category.title]: NonRequirementsTrack.ProductManagement.levelOne
    },
    equivalentLevels: []
};