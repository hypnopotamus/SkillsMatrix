import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { Rank } from "src/domain/Rank";
import { TitleRecord } from "src/domain/TitleFactory";
import { TrackRecord } from "src/domain/TrackFactory";
import { SkillLevel } from "./SkillLevel";
import { TrackLink } from "./Track";

export class TitleLink implements Pick<TitleRecord, "id" | "title"> {
    @ApiProperty({ type: Number })
    readonly id: number;

    @ApiProperty({ type: String })
    readonly title: string;

    @ApiProperty({ type: String })
    readonly link: string;
}

type TitleModel = {
    [property in keyof TitleRecord]:
    TitleRecord[property] extends readonly TitleRecord[] ? readonly TitleLink[]
    : TitleRecord[property] extends TitleRecord ? TitleLink
    : TitleRecord[property] extends TrackRecord | readonly TrackRecord[] ? readonly TrackLink[]
    : TitleRecord[property]
};

export class Title implements TitleModel {
    @ApiProperty({ type: Number })
    readonly id: number;

    @ApiProperty({ type: String })
    readonly title: string;

    @ApiProperty({ type: [TrackLink] })
    readonly track: readonly TrackLink[];

    @ApiProperty({ enum: Rank })
    readonly rank: Rank;

    @ApiProperty({
        type: "object",
        additionalProperties: {
            $ref: getSchemaPath(SkillLevel)
        }
    })
    readonly skills: Record<string, SkillLevel>;

    @ApiProperty({ type: [TitleLink] })
    readonly nextLevels: TitleLink[];

    @ApiProperty({ type: [TitleLink] })
    readonly equivalentLevels: TitleLink[];
}