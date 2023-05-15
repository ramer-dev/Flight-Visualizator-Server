import { PointType } from 'common/dto/coordinate.types';
import { Entity, PrimaryColumn, Column, Point, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Site {
    @PrimaryGeneratedColumn()
    siteId: number;

    @Column()
    siteName: string;
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
    siteCoordinate: Point | PointType
    @Column()
    siteType: string;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
