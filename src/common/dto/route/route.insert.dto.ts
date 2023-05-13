import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsHexColor, IsNotEmpty, IsNumber, IsOptional, IsRgbColor, IsString, MaxLength, MinLength } from "class-validator";
import { FixPoint } from "entities/fix-point.entity";
import { isTypedArray } from "util/types";
import { PointType } from "../coordinate.types";

export class InsertRouteDto {
    @ApiPropertyOptional({ example: 1 })
    @IsString()
    routeNmae: string;
    // @PrimaryColumn()
    // fixPoint: string;
    @ApiProperty({ type: () => [PointType] })
    @IsArray()
    @IsNotEmpty()
    routePoint: PointType[]

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
