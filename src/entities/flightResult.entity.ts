import { IsNumber, isNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class FlightResult {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    siteName: string;

    @IsNumber()
    @Column("double", {precision:5,scale:3})
    
    frequency: number;
    @Column()
    testId: number;
    @Column( )
    txmain: string;
    @Column()
    rxmain: string;
    @Column()
    txstby: string;
    @Column()
    rxstby: string;
    @Column()
    angle: number;
    @Column()
    distance: number; 
    @Column()
    height: number;

} 