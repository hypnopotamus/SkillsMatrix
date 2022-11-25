import { Inject } from "@nestjs/common";
import { TitleRecord as DbTitleRecord, TitleRepository } from "src/data/TitleRepository";
import { TrackRepository } from "src/data/TrackRepository";
import { Mutable } from "utility-types";
import { Title } from "./Title";
import { Track } from "./Track";
import { TrackRecord } from "./TrackFactory";

export type TitleRecord = {
    [property in keyof Title]:
    Title[property] extends readonly Title[] ? readonly TitleRecord[]
    : Title[property] extends Title ? TitleRecord
    : Title[property] extends Track | readonly Track[] ? TrackRecord | readonly TrackRecord[]
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
        @Inject("TitleRepository") private readonly repository: TitleRepository,
        @Inject("TrackRepository") private readonly trackRepository: TrackRepository
    ) {
    }

    async getTitles(): Promise<readonly TitleRecord[]> {
        const records = (await this.repository.getTitles())
            .reduce((titles, title) => titles.set(title.id, title), new Map<number, DbTitleRecord>);
        const titles = new Map<number, TitleRecord>();

        const tracks = new Map<number, TrackRecord>();
        const trackFactory = async (id: number | readonly number[]): Promise<TrackRecord | readonly TrackRecord[]> => {
            const singleTrackFactory = async (id: number): Promise<TrackRecord> => {
                if (tracks.has(id)) return tracks.get(id);

                const trackRecord = await this.trackRepository.getTrack(id);
                const track = {
                    ...trackRecord,
                    titles: []
                };
                tracks.set(id, track);

                return track;
            };

            if (Array.isArray(id)) {
                return Promise.all(id.map(singleTrackFactory));
            } else {
                return singleTrackFactory(id as number);
            }
        };

        for (const title of records.values()) {
            titles.set(title.id, {
                ...title,
                track: [],
                nextLevels: [],
                equivalentLevels: []
            });
        }

        for (const titleRecord of records.values()) {
            const title = titles.get(titleRecord.id) as Mutable<TitleRecord>;

            title.nextLevels = titleRecord.nextLevels.map(id => titles.get(id));
            title.equivalentLevels = titleRecord.equivalentLevels.map(id => titles.get(id));

            title.track = await trackFactory(titleRecord.track);
            if (Array.isArray(title.track)) {
                for (const singleTrack of title.track) {
                    (singleTrack as Mutable<TrackRecord>).titles = singleTrack.titles.concat(title);
                }
            } else {
                const singleTrack = title.track as Mutable<TrackRecord>;
                singleTrack.titles = singleTrack.titles.concat(title);
            }
        }

        return [...titles.values()];
    }

    async getTitle(id: number): Promise<TitleRecord> {
        return (await this.getTitles())
            .find(t => t.id === id);
    }
}