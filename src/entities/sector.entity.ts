import { PointType, PolygonType } from 'common/dto/coordinate.types';
import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, Polygon, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Sector {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sectorName: string;

    @Column({
        type: 'polygon',
        transformer: {
            from: (value: string) => {
                const result = value.replace(/[^\d .,-]/g, '').trim().split(',').map(t => {
                    const parsedPoint = t.split(' ').map(Number)
                    let point: PointType = { lat: parsedPoint[0], lng: parsedPoint[1] };

                    return point;
                })
                return result;
            },
            to: (value: { lat: number, lng: number }) => {
                return `POLYGON(${value.lat} ${value.lng})`
            }
        }
    })
    sectorData: PolygonType;

    @Column()
    sectorAreaId: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
} 