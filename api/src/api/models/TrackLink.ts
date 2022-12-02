import { ApiProperty } from "@nestjs/swagger";
import { TrackRecord } from "src/domain/TrackFactory";

export class TrackLink implements Pick<TrackRecord, "id"> {
    @ApiProperty({ type: Number })
    readonly id: number;

    @ApiProperty({ type: String })
    readonly link: string;
}