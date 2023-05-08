import { IsDateString, IsLatLong, IsNumber, IsOptional, IsString } from "class-validator";
import { Point } from "typeorm";

export class InsertFixPointDto {
    @IsNumber()
    @IsOptional()
    id: number;
    @IsString()
    pointName: string;
    @IsLatLong()
    pointCoordinate: Point;
    @IsOptional()
    @IsDateString()
    deletedAt: Date;
} 
