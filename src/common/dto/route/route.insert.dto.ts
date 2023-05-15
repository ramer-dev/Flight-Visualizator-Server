import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsHexColor, IsNotEmpty, IsNumber, IsOptional, IsRgbColor, IsString, MaxLength, MinLength } from "class-validator";
import { FixPoint } from "entities/fix-point.entity";
import { isTypedArray } from "util/types";
import { PointType } from "../coordinate.types";
import { RouteBaseDto } from "./route.base.insert.dto";

export class InsertRouteDto extends RouteBaseDto {
    @ApiProperty({ example: 1 })
    @IsString()
    routeName: string;
    // @PrimaryColumn()
    // fixPoint: string;

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
