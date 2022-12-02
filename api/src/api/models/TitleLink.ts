import { ApiProperty } from "@nestjs/swagger";
import { TitleRecord } from "src/domain/TitleFactory";

export class TitleLink implements Pick<TitleRecord, "id" | "title"> {
    @ApiProperty({ type: Number })
    readonly id: number;

    @ApiProperty({ type: String })
    readonly title: string;

    @ApiProperty({ type: String })
    readonly link: string;
}