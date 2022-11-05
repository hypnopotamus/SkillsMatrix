import { Inject } from "@nestjs/common";
import { TitleRepository, TitleRecord as DbTitleRecord } from "src/data/TitleRepository";
import { Title } from "./Title";
import { Mutable } from "utility-types";

export type TitleRecord = {
    [property in keyof Title]:
    Title[property] extends readonly Title[] ? readonly TitleRecord[]
    : Title[property] extends Title ? TitleRecord
    : Title[property]
} & {
    readonly id: number;
};

export interface TitleFactory {
    getTitles: () => Promise<readonly TitleRecord[]>;
    getTitle: (id: number) => Promise<TitleRecord>;
}

export class TitleFactoryImpl implements TitleFactory {
    constructor(
        @Inject("TitleRepository") private readonly repository: TitleRepository
    ) {
    }

    async getTitles(): Promise<readonly TitleRecord[]> {
        const records = (await this.repository.getTitles())
            .reduce((titles, title) => titles.set(title.id, title), new Map<number, DbTitleRecord>);
        const titles = new Map<number, TitleRecord>();

        for (const title of records.values()) {
            titles.set(title.id, {
                ...title,
                nextLevels: [],
                equivalentLevels: []
            });
        }

        for (const titleRecord of records.values()) {
            const title = titles.get(titleRecord.id) as Mutable<TitleRecord>;

            title.nextLevels = titleRecord.nextLevels.map(id => titles.get(id));
            title.equivalentLevels = titleRecord.equivalentLevels.map(id => titles.get(id));
        }

        return [...titles.values()];
    }

    async getTitle(id: number): Promise<TitleRecord> {
        return (await this.getTitles())
            .find(t => t.id === id);
    }
}