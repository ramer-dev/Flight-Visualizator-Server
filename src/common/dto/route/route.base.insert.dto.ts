import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class RouteBaseDto {
    @ApiProperty({ example: 1 })
    @IsString()
    routeName: string;
    // @PrimaryColumn()
    // fixPoint: string;
    @ApiProperty({ example: 'AGAVO' })
    @IsString()
    routePoint: string

    @IsNumber()
    @IsOptional()
    routeEntry: number;

    // @IsOptional()
    // @IsNumber()
    // minHeight: number;

    // @IsOptional()
    // @IsNumber()
    // maxHeight: number;

    // @IsOptional()
    // @IsString()
    // routeArea: string;

    // @IsOptional()
    // @IsString()
    // routeType: string;
} 