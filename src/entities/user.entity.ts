import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    id: string;
    @Column()
    pw: string;
    @Column()
    role: number;
} 