import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class FlightList {
    @PrimaryColumn()
    testName: string;
    @Column()
    testDate: string;
    @Column()
    testType: string;
    @Column()
    testRoute: string;
} 