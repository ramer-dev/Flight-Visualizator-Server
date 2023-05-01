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
    @IsString()
    @IsOptional()
    readonly siteName?: string;

    @IsNumber()
    @IsOptional()
    readonly frequency?: number;

    @IsString()
    @IsOptional()
    readonly testName?: string;

    @IsDate()
    @IsOptional()
    readonly startDate?: Date;

    @IsDate()
    @IsOptional()
    readonly endDate?: Date;

    @IsNumber()
    @IsOptional()
    readonly angleStart?: number;

    @IsNumber()
    @IsOptional()
    readonly angleEnd?: number;

    @IsNumber()
    @IsOptional()
    readonly distanceStart?: number;

    @IsNumber()
    @IsOptional()
    readonly distanceEnd?: number;

    @IsNumber()
    @IsOptional()
    readonly heightStart?: number;

    @IsNumber()
    @IsOptional()
    readonly heightEnd?: number;

    @IsNumber()
    @IsOptional()
    readonly score?: number;
}