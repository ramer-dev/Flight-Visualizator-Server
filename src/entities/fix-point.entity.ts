import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, Point, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class FixPoint {
    @ApiProperty({example:0})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'AGAVO'})
    @Column()
    pointName: string;

    @ApiProperty({example:'Point Binary String'})
    @Column({type:'point'})
    pointCoordinate: Point;

    @ApiProperty({example:'2023-00-00'})
    @UpdateDateColumn()
    updatedAt: Date | null;

    @ApiProperty({example:'2023-00-00'})
    @DeleteDateColumn()
    deletedAt: Date | null;
} 