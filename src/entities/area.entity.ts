import { Entity, PrimaryColumn, Column} from 'typeorm';

@Entity()
export class FlightList {
    @PrimaryColumn()
    sectorNum: number;
    @Column()
    areaName: string;
} 