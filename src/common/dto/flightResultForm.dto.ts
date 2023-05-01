import { IsString, IsNumber, IsDate, IsOptional, IsArray } from 'class-validator'
import { FlightListDto } from './flightList.dto';
import { FlightResultDto } from './flightResult.dto';

export class FlightResultFormDto extends FlightListDto{
    @IsArray()
    data :  FlightResultDto[]
} 