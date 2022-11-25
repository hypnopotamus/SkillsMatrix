import { Title } from "src/domain/Title";
import { Track } from "src/domain/Track";
import { graph } from "./gremlin";

export type TrackRecord = {
    [property in keyof Track]:
    Track[property] extends readonly Title[] ? readonly number[]
    : Track[property]
} & {
    readonly id: number;
};

export interface TrackRepository {
    getTracks(): Promise<TrackRecord[]>;
    getTrack(id: number): Promise<TrackRecord>;
}

const hydrateTrack = async (track: any): Promise<TrackRecord> => {
    const { id } = track;

    const getName = async () => (
        await graph.V(id)
            .values('name')
            .next()
    ).value;

    const getTitles = async () => (
        await graph.V(id)
            .out('title')
            .toList()
    ).map(l => (l as any).id);

    return {
        id,
        name: await getName(),
        titles: await getTitles()
    };
};

export const TrackRepositoryImpl: TrackRepository = {
    getTrack: async (id: number) => await hydrateTrack(
        (
            await graph.V(id)
                .hasLabel("Track")
                //.valueMap()
                .next()
        ).value
    ),
    getTracks: async () => await Promise.all((
        await graph.V()
            .hasLabel("Track")
            .toList()
    ).map(hydrateTrack))
};