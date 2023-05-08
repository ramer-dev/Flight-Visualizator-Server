import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional, IsDateString } from 'class-validator'

export class InsertFlightListDto {
    @ApiProperty({example:0})
    @IsOptional()
    id : number;

    @ApiProperty({example:'검사명'})
    @IsString()
    testName: string;

    @ApiProperty({example:'2023-00-00'})
    @IsDateString()
    testDate: string;

    @ApiProperty({example:'정기검사'})
    @IsString()
    testType: string;

    @ApiProperty({example:'C:/route/file/path.txt'})
    @IsString()
    @IsOptional()
    testRoute: string;

    @ApiProperty({example:'username'})
    @IsString()
    userId: string;
}