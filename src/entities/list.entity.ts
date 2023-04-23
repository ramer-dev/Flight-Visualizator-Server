import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class FlightList {
    @PrimaryColumn()
    TestName: string;
    @Column()
    TestDate: string;
    @Column()
    TestType: string;
    @Column( )
    TestRoute: string;
    @Column()
    TestRouteFile: string;
} 