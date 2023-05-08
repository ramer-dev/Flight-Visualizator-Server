import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, isNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';


@Entity()
export class FlightResult {
    @ApiProperty({example:0})
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
    
    @ApiProperty({example:'5/5'})
    @Column( )
    txmain: string;

    @ApiProperty({example:'5/5'})
    @Column()
    rxmain: string;

    @ApiProperty({example:'5/5'})
    @Column()
    txstby: string;

    @ApiProperty({example:'5/5'})
    @Column()
    rxstby: string;

    @ApiProperty({example:0})
    @Column()
    angle: number;

    @ApiProperty({example:0})
    @Column()
    distance: number;

    @ApiProperty({example:0})
    @Column()
    height: number;

    @ApiProperty({example:true})
    @Column()
    status: boolean;

    @ApiProperty({example:'2023-00-00'})
    @UpdateDateColumn()
    updatedAt: Date;
    
    @ApiProperty({example:'2023-00-00'})
    @DeleteDateColumn()
    deletedAt: Date;
} 