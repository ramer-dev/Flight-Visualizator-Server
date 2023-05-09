import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsDateString, IsISO8601, IsNumber, IsOptional, IsString } from "class-validator";

export class InsertNoticeDto {
    @ApiPropertyOptional({example:0})
    @IsOptional()
    @IsNumber()
    id: number;

    @ApiProperty({example:'제목'})
    @IsString()
    title: string;

    @ApiProperty({example:'내용'})
    @IsString()
    context: string;

    @ApiProperty({example:'2023-00-00'})
    @IsDateString()
    date:Date;

    @ApiProperty({example:'정기검사'})
    @IsString()
    type:string;

    @ApiProperty({example:'1.1.1'})
    @IsString()
    version:string;

    @ApiProperty({example:'username'})
    @IsString()
    user:string;
} 