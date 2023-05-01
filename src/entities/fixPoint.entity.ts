import { Entity, PrimaryColumn, Column, Point } from 'typeorm';

@Entity()
export class FixPoint {
    @PrimaryColumn()
    pointName: string;
    @Column()
    pointCoordinate: Point;
    @Column()
    isusing: boolean;
} 