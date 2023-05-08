import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator'

export class InsertFlightListDto {
    @IsOptional()
    id : number;

    @IsString()
    testName: string;

    // @IsDate()
    @IsString()
    testDate: string;

    @IsString()
    testType: string;

    @IsString()
    @IsOptional()
    testRoute: string;

    @IsString()
    userId: string;
}