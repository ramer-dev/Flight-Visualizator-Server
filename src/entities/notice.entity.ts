import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notice {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    context: number;
    @Column()
    date:string;
    @Column()
    type:string;
    @Column()
    version:string;
} 