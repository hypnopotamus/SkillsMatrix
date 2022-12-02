import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { TrackFactory, TrackRecord } from 'src/domain/TrackFactory';
import { Track } from '../models/Track';
import { TrackLink } from '../models/TrackLink';
import { titleLinkFactory } from './title.controller';

export const trackLinkFactory = (track: TrackRecord): TrackLink => ({
    id: track.id,
    link: `/Tracks/${track.id}`
});

@Controller("Tracks")
export class TrackController {
    constructor(
        @Inject("TrackFactory") private readonly factory: TrackFactory
    ) { }

    @Get()
    @ApiResponse({ type: [TrackLink] })
    async getAllTracks(): Promise<TrackLink[]> {
        const tracks = await this.factory.getTracks();

        return tracks.map(trackLinkFactory);
    }

    @Get(":id")
    @ApiParam({ name: "id", type: Number })
    @ApiResponse({ type: Track })
    async getTrack(@Param('id') id: string): Promise<Track> {
        const track = await this.factory.getTrack(Number(id));

        return {
            ...track,
            titles: track.titles.map(titleLinkFactory)
        };
    }
}
