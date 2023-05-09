import { Entity, PrimaryColumn, Column, Point } from 'typeorm';

@Entity()
export class Site {
    @PrimaryColumn()
    siteName : string;
    @Column()
    siteCoordinate : Point
    @Column()
    siteType : string;
}
