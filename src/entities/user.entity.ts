import { Exclude } from 'class-transformer';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    id: string;
    @Column()
    pw: string;
    @Column()
    role: number;
    @Column({nullable:true})
    @Exclude()
    currentHashedRefreshToken? : string;
} 