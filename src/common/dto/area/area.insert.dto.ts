import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsHexColor, IsNumber, IsOptional, IsRgbColor, IsString, MaxLength, MinLength } from "class-validator";

export class InsertAreaDto {
    @ApiPropertyOptional({ example: 1 })
    @IsNumber()
    @IsOptional()
    id: number;

    @ApiProperty({ example: '영역 이름' })
    @IsString()
    areaName : string;

    @ApiProperty({ example: '#123123' })
    @IsHexColor()
    @MinLength(7)
    @MaxLength(7)
    areaColor : string;
}
