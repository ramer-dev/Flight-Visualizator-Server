import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Frequency {
    @PrimaryColumn( "double", {precision:5,scale:3})
    frequency: number;
    @PrimaryColumn()
    frequencySite: string;
    @Column()
    frequencySector: string;
    @Column()
    isdeleted:boolean;
} 