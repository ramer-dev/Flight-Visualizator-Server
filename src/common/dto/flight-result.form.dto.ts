import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional, IsArray } from 'class-validator'
import { InsertFlightListDto } from './flight-list/flight-list.insert.dto';
import { InsertFlightResultDto } from './flight-result/flight-result.insert.dto';
import { UpdateFlightResultDto } from './flight-result/flight-result.update.dto';

export class FlightResultAddFormDto extends InsertFlightListDto{
    @ApiProperty({type:[InsertFlightResultDto]})
    @IsArray()
    data :  InsertFlightResultDto[]
} 


export class FlightResultUpdateFormDto extends InsertFlightListDto{
    @ApiProperty({type:[UpdateFlightResultDto]})
    @IsArray()
    data :  UpdateFlightResultDto[]
} 