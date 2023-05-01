import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Route {
    @PrimaryColumn()
    airRoute: string;
    @PrimaryColumn()
    fixPoint: string;
    @Column()
    lowHeight: number;
    @Column()
    highHeight: number;
    @Column()
    entry: number;
    @Column()
    fir: string;
    @Column()
    type: string;
} 