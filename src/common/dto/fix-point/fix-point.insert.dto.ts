import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Point } from "typeorm";

export class InsertFixPointDto {
    @ApiPropertyOptional({ example: 1 })
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @MaxLength(5)
    @ApiProperty({ example: 'ABCDE' })
    pointName: string;

    @ApiProperty({ example: [123.5, 25.5] })
    @IsNumber({},{each:true})
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    pointCoordinate: number[];

    @ApiPropertyOptional({ example: '2023-00-00' })
    @IsOptional()
    @IsDateString()
    updatedAt: Date;

    @ApiPropertyOptional({ example: '2023-00-00' })
    @IsOptional()
    @IsDateString()
    deletedAt: Date;
} 
