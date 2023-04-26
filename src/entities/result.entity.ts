import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FlightList } from './list.entity';

@Entity()
export class FlightResult {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    sitename: string;
    @Column()
    frequency: number;
    @Column()
    testname: string;
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