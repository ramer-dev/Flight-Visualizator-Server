import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class RefreshToken {
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