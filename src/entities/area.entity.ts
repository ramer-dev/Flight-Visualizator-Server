import { Entity, PrimaryColumn, Column} from 'typeorm';

@Entity()
export class Area {
    @PrimaryColumn()
    sectorNum: number;
    @Column()
    areaName: string;
} 