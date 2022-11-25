import { process } from "gremlin";
import { Track } from 'src/domain/Track';
import { graph } from '../../gremlin';
import { ProjectTrack } from './Project';
import { TechTrack } from './Tech';

const { cardinality: { single } } = process;

const seedTrack = async (track: Track, tracks: any) => {
    const trackVertex = graph.addV('Track')
        .property(single, 'name', track.name);
    const vertex = (await trackVertex.next()).value;

    await graph.V(vertex.id).as('track')
        .V(tracks.id).as('tracks')
        .addE('track').from_('tracks').to('track')
        .iterate();

    return {
        track,
        vertex
    };
};

export const seedTracks = async () => {
    const tracks = (await graph.addV('Tracks').next()).value;

    await Promise.all([
        seedTrack(ProjectTrack, tracks),
        seedTrack(TechTrack, tracks)
    ]);
};