import { IsDate, IsDateString, IsISO8601, IsNumber, IsOptional, IsString } from "class-validator";

export class InsertNoticeDto {
    @IsOptional()
    @IsNumber()
    id: number;
    @IsString()
    title: string;
    @IsString()
    context: string;
    @IsDateString()
    date:Date;
    @IsString()
    type:string;
    @IsString()
    version:string;
    @IsString()
    user:string;
} 