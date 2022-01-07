import { Title } from "./titles/Title";

export interface TitleTree {
    readonly root: Title;
    readonly titles: ReadonlyMap<string, Title>;
}