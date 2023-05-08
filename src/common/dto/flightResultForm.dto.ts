import { IsString, IsNumber, IsDate, IsOptional, IsArray } from 'class-validator'
import { InsertFlightListDto } from './flightList/flightList.insert.dto';
import { InsertFlightResultDto } from './flightResult/flightResult.insert.dto';

export class FlightResultFormDto extends InsertFlightListDto{
    @IsArray()
    data :  InsertFlightResultDto[]
} 