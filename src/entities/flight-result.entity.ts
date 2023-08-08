import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, isNumber } from 'class-validator';
import { PageRequest } from 'common/class/page.request.class';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';


@Entity()
export class FlightResult extends PageRequest{
    @ApiPropertyOptional({example:0})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'부안'})
    @Column()
    siteName: string;

    @ApiProperty({example:121.5})
    @IsNumber()
    @Column("double", {precision:5,scale:3})
    frequency: number;

    @ApiProperty({example:1})
    @Column()
    testId: number;
    
    @ApiPropertyOptional({example:'5/5'})
    @Column( )
    txmain: string;

    @ApiPropertyOptional({example:'5/5'})
    @Column()
    rxmain: string;

    @ApiPropertyOptional({example:'5/5'})
    @Column()
    txstby: string;

    @ApiPropertyOptional({example:'5/5'})
    @Column()
    rxstby: string;

    @ApiProperty({example:0})
    @Column()
    angle: number;

    @ApiProperty({example:0})
    @Column()
    distance: number;

    @ApiPropertyOptional({example:0})
    @Column()
    height: number;

    @ApiPropertyOptional({example:true})
    @Column()
    status: boolean;

    @ApiPropertyOptional({example:'2023-00-00'})
    @UpdateDateColumn()
    updatedAt: Date;
    
    @ApiPropertyOptional({example:'2023-00-00'})
    @DeleteDateColumn()
    deletedAt: Date;

} 