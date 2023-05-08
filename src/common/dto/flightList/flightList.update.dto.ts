import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator'
import { InsertFlightListDto } from './flightList.insert.dto';

export class UpdateFlightListDto extends PartialType(InsertFlightListDto){
}