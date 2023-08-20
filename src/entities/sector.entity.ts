import { PointType, PolygonType } from 'common/dto/coordinate.types';
import { Entity, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, Polygon, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Area } from './area.entity';

@Entity()
export class Sector {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sectorName: string;

    @Column({
        type: 'polygon',
        srid:4326,
        transformer: {
            from: (value: string) => {
                const result = value.replace(/[^\d .,-]/g, '').trim().split(',').map(t => {
                    const parsedPoint = t.split(' ').map(Number)
                    // console.log(parsedPoint)
                    const point: PointType = { lat: parsedPoint[0], lng: parsedPoint[1] };

                    return point;
                })
                return result;
            },
            to: (value: PointType[]) => {
                const text = value.map(t => `${t.lat} ${t.lng}`).join(', ');
                return `POLYGON((${text}))`
            }
        }
    })
    sectorData: PointType[];

    // @Column()
    // sectorAreaId: number;

    @ManyToOne(() => Area, {eager:true})
    @JoinColumn({name: 'sector_area_id', referencedColumnName:'areaId'})
    sectorArea : Area;
 
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
} 