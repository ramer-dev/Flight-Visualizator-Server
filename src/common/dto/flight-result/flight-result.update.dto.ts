import { PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator'
import { InsertFlightResultDto } from './flight-result.insert.dto';

export class UpdateFlightResultDto extends PartialType(InsertFlightResultDto) {
}