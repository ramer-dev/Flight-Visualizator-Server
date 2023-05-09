import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator'

export class InsertFlightResultDto {
    @ApiProperty({example:'부안'})
    @IsString()
    siteName: string;
    
    @ApiProperty({example:121.5})
    @IsNumber()
    frequency: number;
    
    @ApiProperty({example:1})
    @IsNumber()
    testId: number;
    
    @ApiPropertyOptional({example:'5/5'})
    @IsString()
    @IsOptional()
    txmain: string;
    
    @ApiPropertyOptional({example:'5/5'})
    @IsString()
    @IsOptional()
    rxmain: string;
    
    @ApiPropertyOptional({example:'5/5'})
    @IsString()
    @IsOptional()
    txstby: string;
    
    @ApiPropertyOptional({example:'5/5'})
    @IsString()
    @IsOptional()
    rxstby: string;
    
    @ApiProperty({example:1})
    @IsNumber()
    angle: number;

    @ApiProperty({example:1})
    @IsNumber()
    distance: number;
    
    @ApiProperty({example:1})
    @IsNumber()
    @IsOptional()
    height: number;
}