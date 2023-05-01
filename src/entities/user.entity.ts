import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryColumn()
    id: string;
    @Column()
    pw: string;
    @Column()
    role: number;
    @Column()
    refreshToken:string;
} 