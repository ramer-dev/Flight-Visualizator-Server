import { ApiProperty } from '@nestjs/swagger';
import { PointType } from 'common/dto/coordinate.types';
import { Entity, PrimaryGeneratedColumn, Column, Point, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class FixPoint {
    @ApiProperty({ example: 0 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'AGAVO' })
    @Column()
    pointName: string;

    @ApiProperty({ example: { lat: 0, lng: 0 } })
    @Column({
        type: 'point',
        transformer: {
            from: (value: string) => { 
                const [x, y] = value.replace(/[^\d .-]/g, '').trim().split(' ')
                return { lat: +x, lng: +y };
            },
            to: (value: { lat: number, lng: number }) => {
                return `POINT(${value.lat} ${value.lng})`
            }
        }
    })
    pointCoordinate: Point | PointType;

    @ApiProperty({ example: '2023-00-00' })
    @UpdateDateColumn()
    updatedAt: Date | null;

    @ApiProperty({ example: '2023-00-00' })
    @DeleteDateColumn()
    deletedAt: Date | null;
} 