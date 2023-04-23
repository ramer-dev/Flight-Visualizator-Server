import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Account {
    @PrimaryColumn()
    id: string;
    @Column()
    pw: string;
    @Column()
    authority: number;
} 