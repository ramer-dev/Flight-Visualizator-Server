import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer/types/decorators";
import { IsDateString, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { PointType, PolygonType } from "../coordinate.types";

export class InsertSectorDto {
    @ApiPropertyOptional({ example: 0 })
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty({ example: "섹터이름" })
    @IsString()
    sectorName: string;

    @ApiProperty({ example: [{ lat: 123.5, lng: 25.5 }] })
    @ValidateNested({ each: true })
    sectorData: PolygonType

    @ApiProperty({ example: 0 })
    @IsNumber()
    sectorAreaId: number;

    @ApiPropertyOptional({ example: '2023-00-00' })
    @IsDateString()
    @IsOptional()
    updatedAt: Date;

    @ApiPropertyOptional({ example: '2023-00-00' })
    @IsDateString()
    @IsOptional()
    deletedAt: Date;

}