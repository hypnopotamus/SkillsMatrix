import { ApiProperty } from "@nestjs/swagger";
import { TitleRecord } from "src/domain/TitleFactory";
import { TrackRecord } from "src/domain/TrackFactory";
import { TitleLink } from "./TitleLink";

type TrackModel = {
    [property in keyof TrackRecord]:
    TrackRecord[property] extends readonly TitleRecord[] ? readonly TitleLink[]
    : TrackRecord[property]
};

export class Track implements TrackModel {
    @ApiProperty({ type: Number })
    readonly id: number;

    @ApiProperty({ type: String })
    readonly name: string;

    @ApiProperty({ type: [TitleLink] })
    readonly titles: TitleLink[];
}