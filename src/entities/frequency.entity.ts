import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class FrequencyEntity {
    @PrimaryColumn()
    frequency: number;
    @PrimaryColumn()
    frequencySite: string;
    @Column()
    frequencySector: string;
    @Column()
    isdeleted:boolean;
} 