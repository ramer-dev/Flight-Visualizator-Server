import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { FlightResult } from './flightResult.entity';

@Entity()
export class FlightList {
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    testName: string;
    @Column()
    testDate: Date;
    @Column()
    testType: string;
    @Column()
    testRoute: string;
    @Column()
    userId: string;

    data:FlightResult[];
}