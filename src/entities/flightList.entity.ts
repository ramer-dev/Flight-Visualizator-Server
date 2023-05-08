import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { FlightResult } from './flightResult.entity';

@Entity()
export class FlightList {
    @ApiProperty({example:0})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'제목'})
    @Column()
    testName: string;

    @ApiProperty({example:'2023-00-00'})
    @Column()
    testDate: Date;

    @ApiProperty({example:'정기검사'})
    @Column()
    testType: string;

    @ApiProperty({example:'c://file/route.txt'})
    @Column()
    testRoute: string;
    
    @ApiProperty({example:'username'})
    @Column()
    userId: string;

    @ApiProperty({example:'2023-00-00'})
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty({example:'2023-00-00'})
    @DeleteDateColumn()
    deletedAt: Date | null;

    @ApiProperty({type : [FlightResult]})
    data: FlightResult[];
}