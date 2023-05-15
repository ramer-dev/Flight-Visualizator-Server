import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { PointType } from "../coordinate.types";

export class InsertSiteDto {

    @ApiPropertyOptional({ example: 0 })
    @IsOptional()
    @IsNumber()
    siteId: number;

    @ApiProperty({ example: "표지소 이름" })
    @IsString()
    siteName: string;

    @ApiProperty({ example: [{ lat: 123.5, lng: 25.5 }] })
    @ValidateNested({ each: true })
    @Type(() => PointType)
    siteCoordinate: PointType;

    @ApiProperty({example: 'SITE'})
    @IsEnum(['SITE', 'VORTAC', 'LOWSITE'])
    siteType: string;

}