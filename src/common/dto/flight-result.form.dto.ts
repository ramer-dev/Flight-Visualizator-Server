import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional, IsArray } from 'class-validator'
import { InsertFlightListDto } from './flight-list/flight-list.insert.dto';
import { InsertFlightResultDto } from './flight-result/flight-result.insert.dto';

export class FlightResultFormDto extends InsertFlightListDto{
    @ApiProperty({type:[InsertFlightResultDto]})
    @IsArray()
    data :  InsertFlightResultDto[]
} 