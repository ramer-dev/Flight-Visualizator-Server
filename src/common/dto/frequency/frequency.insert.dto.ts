import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { DeleteDateColumn } from "typeorm";
import { PointType } from "../coordinate.types";

export class InsertFrequencyDto {

    @ApiPropertyOptional({ example: 0 })
    @IsOptional()
    @IsNumber()
    frequencyId: number;

    @ApiProperty({ example: 123.456 })
    @IsNumber()
    frequency: number;

    @ApiProperty({ example: '부안' })
    @IsString()
    frequencySiteName: string;

    @ApiProperty({example: 1})
    @IsNumber()
    frequencySiteId : number;
}