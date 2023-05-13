import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsHexColor, IsNotEmpty, IsNumber, IsOptional, IsRgbColor, IsString, MaxLength, MinLength } from "class-validator";
import { FixPoint } from "entities/fix-point.entity";
import { isTypedArray } from "util/types";
import { PointType } from "../coordinate.types";

export class InsertRouteDto {
    @ApiProperty({ example: 1 })
    @IsString()
    routeName: string;
    // @PrimaryColumn()
    // fixPoint: string;
    @ApiProperty({ example: 'AGAVO' })
    @IsString()
    routePoint: string

    @IsNumber()
    routeEntry: number;

    @IsOptional()
    @IsNumber()
    minHeight: number;

    @IsOptional()
    @IsNumber()
    maxHeight: number;

    @IsOptional()
    @IsString()
    routeArea: string;

    @IsOptional()
    @IsString()
    routeType: string;
}
