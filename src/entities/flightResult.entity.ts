import { isNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FlightList } from './flightList.entity';

@Entity()
export class FlightResult {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    siteName: string;
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