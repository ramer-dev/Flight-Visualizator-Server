import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator'

export class FlightResultDto {
    @IsString()
    sitename: string;
    
    @IsNumber()
    frequency: number;
    
    // @IsNumber()
    // testId: number;
    
    @IsString()
    @IsOptional()
    txmain: string;
    
    @IsString()
    @IsOptional()
    rxmain: string;
    
    @IsString()
    @IsOptional()
    txstby: string;
    
    @IsString()
    @IsOptional()
    rxstby: string;
    
    @IsNumber()
    angle: number;

    @IsNumber()
    distance: number;
    
    @IsNumber()
    @IsOptional()
    height: number;
}