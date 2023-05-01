import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator'

export class FlightListDto {
    @IsString()
    testName : string;

    // @IsDate()
    @IsString()
    testDate: string;

    @IsString()
    testType:string;

    @IsString()
    @IsOptional()
    testRoute:string;

    @IsString()
    userId:string;
}