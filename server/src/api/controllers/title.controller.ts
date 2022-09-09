import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { graph } from '../../data/gremlin';

@Controller("Titles")
export class TitleController {
    @Get()
    @ApiResponse({ type: [String] })
    //todo link to the actual title in the response
    async getAllTitles(): Promise<string[]> {
        return (await graph.V()
            .hasLabel('Title')
            .properties('title')
            .toList())
            .map(t => (t as any).value);
    }
}
