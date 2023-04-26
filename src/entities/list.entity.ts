import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, ManyToOne, JoinTable } from 'typeorm';
import { FlightResult } from './result.entity';

@Entity()
export class FlightList {
    @PrimaryColumn()
    TestName: string;
    @Column()
    TestDate: string;
    @Column()
    TestType: string;
    @Column()
    TestRoute: string;
} 