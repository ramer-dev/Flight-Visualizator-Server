import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn, Column, Point } from 'typeorm';
import { DeleteDateColumn } from 'typeorm/decorator/columns/DeleteDateColumn';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

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
    @DeleteDateColumn()
    deletedAt: Date | null;
} 