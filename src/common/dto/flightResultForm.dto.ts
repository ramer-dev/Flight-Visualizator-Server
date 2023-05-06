import { IsString, IsNumber, IsDate, IsOptional, IsArray } from 'class-validator'
import { FlightListDto } from './flightList.dto';
import { InsertFlightResultDto } from './flightResult.insert.dto';

export class FlightResultFormDto extends FlightListDto{
    @IsArray()
    data :  InsertFlightResultDto[]
} 