import { Entity, PrimaryColumn, Column, Point } from 'typeorm';

@Entity()
export class SiteEntity {
    @PrimaryColumn()
    siteName : string;
    @Column()
    siteCoordinate : Point
    @Column()
    siteType : string;
}
