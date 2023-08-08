import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Page } from 'common/class/page.class';
import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable, UpdateDateColumn, DeleteDateColumn, CreateDateColumn } from 'typeorm';
import { FlightResult } from './flight-result.entity';

@Entity()
export class FlightList {
    @ApiPropertyOptional({example:0})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'제목'})
    @Column()
    testName: string;

    @ApiProperty({example:'2023-00-00'})
    @CreateDateColumn()
    testDate: Date;

    @ApiProperty({example:'정기검사'})
    @Column()
    testType: string;

    @ApiPropertyOptional({example:'c://file/route.txt'})
    @Column()
    testRoute: string;
    
    @ApiProperty({example:'username'})
    @Column()
    userId: string;

    @ApiPropertyOptional({example:'2023-00-00'})
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiPropertyOptional({example:'2023-00-00'})
    @DeleteDateColumn()
    deletedAt: Date | null;

    @ApiProperty({type : [Page<FlightResult>]})
    data: Page<FlightResult>

    // @ApiProperty({type : [Number]})
    // count?: number
}