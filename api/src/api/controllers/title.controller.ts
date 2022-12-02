import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { TitleFactory, TitleRecord } from 'src/domain/TitleFactory';
import { TrackRecord } from 'src/domain/TrackFactory';
import { Title } from '../models/Title';
import { TitleLink } from '../models/TitleLink';
import { trackLinkFactory } from './track.controller';

export const titleLinkFactory = (title: TitleRecord): TitleLink => ({
    id: title.id,
    title: title.title,
    link: `/Titles/${title.id}`
});

@Controller("Titles")
export class TitleController {
    constructor(
        @Inject("TitleFactory") private readonly factory: TitleFactory
    ) { }

    @Get()
    @ApiResponse({ type: [TitleLink] })
    async getAllTitles(): Promise<TitleLink[]> {
        const titles = await this.factory.getTitles();

        return titles.map(titleLinkFactory);
    }

    @Get(":id")
    @ApiParam({ name: "id", type: Number })
    @ApiResponse({ type: Title })
    async getTitle(@Param('id') id: string): Promise<Title> {
        const title = await this.factory.getTitle(Number(id));

        return {
            ...title,
            track: Array.isArray(title.track)
                ? title.track.map(trackLinkFactory)
                : [trackLinkFactory(title.track as TrackRecord)],
            nextLevels: title.nextLevels.map(titleLinkFactory),
            equivalentLevels: title.equivalentLevels.map(titleLinkFactory)
        };
    }
}
