import { PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator'
import { InsertFlightListDto } from './flight-list.insert.dto';
import { FlightResult } from 'entities/flight-result.entity';

export class UpdateFlightListDto extends PartialType(InsertFlightListDto){
}