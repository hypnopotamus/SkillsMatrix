import { Title } from "./Title";

//todo move the abstractions of the domain model to their own package
export interface Track {
    readonly name: string;
    readonly titles: Title[];
}