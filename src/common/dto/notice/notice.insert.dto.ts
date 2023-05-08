import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class InsertNoticeDto {
    @IsOptional()
    @IsNumber()
    id: number;
    @IsString()
    title: string;
    @IsNumber()
    context: number;
    @IsDate()
    date:Date;
    @IsString()
    type:string;
    @IsString()
    version:string;
    @IsString()
    user:string;
} 