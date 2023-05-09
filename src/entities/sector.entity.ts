import { Entity, PrimaryColumn, Column, Polygon } from 'typeorm';

@Entity()
export class Sector {
    @PrimaryColumn()
    sectorName: string;
    @Column()
    sectorData: Polygon;
    @Column()
    sectorAreaId: number;
    @Column()
    isDeleted:boolean;
} 