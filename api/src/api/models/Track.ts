import { ApiProperty } from "@nestjs/swagger";
import { TrackRecord } from "src/domain/TrackFactory";
import { TitleLink } from "./Title";

export class TrackLink implements Pick<TrackRecord, "id"> {
    @ApiProperty({ type: Number })
    readonly id: number;

    @ApiProperty({ type: String })
    readonly link: string;
}

export class Track {
    @ApiProperty({ type: String })
    readonly name: string;

    @ApiProperty({ type: [TitleLink] })
    readonly titles: TitleLink[];
}