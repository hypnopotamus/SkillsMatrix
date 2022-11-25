import { Inject } from "@nestjs/common";
import { TitleRepository, TitleRecord as DbTitleRecord } from "src/data/TitleRepository";
import { TrackRepository, TrackRecord as DbTrackRecord } from "src/data/TrackRepository";
import { Mutable } from "utility-types";
import { Title } from "./Title";
import { TitleRecord } from "./TitleFactory";
import { Track } from "./Track";

export type TrackRecord = {
    [property in keyof Track]:
    Track[property] extends readonly Title[] ? readonly TitleRecord[]
    : Track[property]
} & {
    readonly id: number;
};

export interface TrackFactory {
    getTracks: () => Promise<readonly TrackRecord[]>;
    getTrack: (id: number) => Promise<TrackRecord>;
}

export class TrackFactoryImpl implements TrackFactory {
    constructor(
        @Inject("TrackRepository") private readonly repository: TrackRepository,
        @Inject("TitleRepository") private readonly titleRepository: TitleRepository,
    ) {
    }

    async getTracks(): Promise<readonly TrackRecord[]> {
        const trackFactory = (track: DbTrackRecord): TrackRecord => ({
            ...track,
            titles: []
        });
        const records = (await this.repository.getTracks())
            .reduce((tracks, track) => tracks.set(track.id, track), new Map<number, DbTrackRecord>);
        const tracks = [...records.values()]
            .reduce((tracks, track) => tracks.set(track.id, trackFactory(track)), new Map<number, TrackRecord>);
        const getTrackForTitle = (title: DbTitleRecord): TrackRecord | readonly TrackRecord[] => {
            if (Array.isArray(title.track)) {
                return title.track.map(t => tracks.get(t));
            }

            return tracks.get(title.track as number);
        };

        const titles = new Map<number, TitleRecord>();
        const titleFactory = async (id: number): Promise<TitleRecord> => {
            if (titles.has(id)) return titles.get(id);

            const titleRecord = await this.titleRepository.getTitle(id);
            const title: Mutable<TitleRecord> = {
                ...titleRecord,
                track: getTrackForTitle(titleRecord),
                nextLevels: [],
                equivalentLevels: []
            }
            titles.set(titleRecord.id, title);

            title.nextLevels = await Promise.all(titleRecord.nextLevels.map(titleFactory));
            title.equivalentLevels = await Promise.all(titleRecord.equivalentLevels.map(titleFactory));

            return title;
        };

        for (const trackRecord of records.values()) {
            const track = tracks.get(trackRecord.id) as Mutable<TrackRecord>;

            track.titles = await Promise.all(trackRecord.titles.map(titleFactory));
        }

        return [...tracks.values()];
    }

    async getTrack(id: number): Promise<TrackRecord> {
        return (await this.getTracks())
            .find(t => t.id === id);
    }
}