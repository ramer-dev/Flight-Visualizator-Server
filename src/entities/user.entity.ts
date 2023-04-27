import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryColumn()
    id: string;
    @Column()
    pw: string;
    @Column()
    role: number;
    @Column()
    refreshToken:string;
} 