import { PointType } from 'common/dto/coordinate.types';
import { Entity, PrimaryColumn, Column, Point, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity()
export class Site {
    @ApiPropertyOptional({example:1})
    @PrimaryGeneratedColumn()
    siteId: number;

    @ApiProperty({example:"부안"})
    @Column()
    siteName: string;

    @ApiProperty({example:{lat:0, lng:0}})
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
    @ApiProperty({example:"저고도"})
    @Column()
    siteType: string;

    @ApiProperty({example:new Date()})
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty({example:new Date()})

    @DeleteDateColumn()
    deletedAt: Date;
}
