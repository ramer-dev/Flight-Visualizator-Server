import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator'
// export type SearchType = {
//     siteName?: string;
//     frequency?: number;
//     testName?: string;
//     startDate?: Date;
//     endDate?: Date;
//     angleStart?: number;
//     angleEnd?: number;
//     distanceStart?: number;
//     distanceEnd?: number;
//     heightStart?: number;
//     heightEnd?: number;
//     score: number;
// }

export class SearchDto {
    @ApiPropertyOptional({example:'부안'})
    @IsString()
    @IsOptional()
    readonly siteName?: string;

    @ApiPropertyOptional({example:121.5})
    @IsNumber()
    @IsOptional()
    readonly frequency?: number;

    @ApiPropertyOptional({example:'부안'})
    @IsString()
    @IsOptional()
    readonly testName?: string;

    @ApiPropertyOptional({example:'2023-00-00'})
    @IsDate()
    @IsOptional()
    readonly startDate?: Date;

    @ApiPropertyOptional({example:'2023-00-00'})
    @IsDate()
    @IsOptional()
    readonly endDate?: Date;

    @ApiPropertyOptional({example:0})
    @IsNumber()
    @IsOptional()
    readonly angleStart?: number;

    @ApiPropertyOptional({example:360})
    @IsNumber()
    @IsOptional()
    readonly angleEnd?: number;

    @ApiPropertyOptional({example:0})
    @IsNumber()
    @IsOptional()
    readonly distanceStart?: number;

    @ApiPropertyOptional({example:999})
    @IsNumber()
    @IsOptional()
    readonly distanceEnd?: number;

    @ApiPropertyOptional({example:0})
    @IsNumber()
    @IsOptional()
    readonly heightStart?: number;

    @ApiPropertyOptional({example:99999})
    @IsNumber()
    @IsOptional()
    readonly heightEnd?: number;

    @ApiPropertyOptional({example:5})
    @IsNumber()
    @IsOptional()
    readonly score?: number;
}