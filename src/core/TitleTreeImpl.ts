import { TitleTree } from "./TitleTree";
import { SoftwareDeveloper } from "./titles/SoftwareDeveloper";
import { SoftwareEngineer } from "./titles/SoftwareEngineer";
import { TechnicalLead } from "./titles/TechnicalLead";
import { Title } from "./titles/Title";
import { ProjectLead } from "./titles/ProjectLead";
import { TechnicalArchitect } from "./titles/TechnicalArchitect";
import { ProjectArchitect } from "./titles/ProjectArchitect";
import { SeniorTechnicalArchitect } from "./titles/SeniorTechnicalArchitect";

SoftwareDeveloper.nextLevels.push(SoftwareEngineer);
SoftwareEngineer.nextLevels.push(TechnicalLead);
TechnicalLead.nextLevels.push(ProjectLead, TechnicalArchitect);
ProjectLead.nextLevels.push(ProjectArchitect);
TechnicalArchitect.nextLevels.push(SeniorTechnicalArchitect);

ProjectLead.equivalentLevels.push(TechnicalArchitect);
TechnicalArchitect.equivalentLevels.push(ProjectLead);
ProjectArchitect.equivalentLevels.push(SeniorTechnicalArchitect);
SeniorTechnicalArchitect.equivalentLevels.push(ProjectArchitect);

export const TitleTreeImpl: TitleTree = {
    root: SoftwareDeveloper,
    titles: new Map<string, Title>([
        [SoftwareDeveloper.title, SoftwareDeveloper],
        [SoftwareEngineer.title, SoftwareEngineer],
        [TechnicalLead.title, TechnicalLead],
        [ProjectLead.title, ProjectLead],
        [TechnicalArchitect.title, TechnicalArchitect],
        [SeniorTechnicalArchitect.title, SeniorTechnicalArchitect],
    ])
};