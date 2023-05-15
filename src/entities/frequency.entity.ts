import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Frequency {
    @PrimaryGeneratedColumn()
    frequencyId: number;
    @Column("double", { precision: 5, scale: 3 })
    frequency: number;
    @Column()
    frequencySiteName: string;
    @Column()
    frequencySiteId: number;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt: Date;
} 