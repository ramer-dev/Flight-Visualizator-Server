import { ArrayMinSize, IsArray, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { Point } from "typeorm";

type PointType = {
    latitude: number;
    longitude: number;
}

export class InsertFixPointDto {
    @IsNumber()
    @IsOptional()
    id: number;
    @IsString()
    pointName: string;
    @IsArray()
    @ArrayMinSize(2)
    pointCoordinate: PointType[];
    @IsOptional()
    @IsDateString()
    deletedAt: Date;
} 
