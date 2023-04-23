import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class FlightTestList {
    @PrimaryGeneratedColumn()
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