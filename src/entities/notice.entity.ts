import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Notice {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    context: string;
    @Column()
    date:Date;
    @Column()
    type:string;
    @Column()
    version:string;
    @Column()
    user:string;
    @UpdateDateColumn()
    updatedAt:Date;
    @DeleteDateColumn()
    deletedAt:Date;
} 