import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type, Transform, plainToInstance } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested, ValidationTypes } from "class-validator";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { PointType } from "../coordinate.types";

export class InsertFixPointDto {
    @ApiPropertyOptional({ example: 1 })
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @MaxLength(5)
    @ApiProperty({ example: 'ABCDE' })
    pointName: string;

    @ApiProperty({ example: { lat: 123, lng: 123 } })
    @IsObject()
    // @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PointType)
    pointCoordinate: PointType;

    @ApiPropertyOptional({ example: '2023-00-00' })
    @IsOptional()
    @IsDateString()
    updatedAt: Date;

    @ApiPropertyOptional({ example: '2023-00-00' })
    @IsOptional()
    @IsDateString()
    deletedAt: Date;
} 
