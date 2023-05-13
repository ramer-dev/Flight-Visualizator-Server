import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Route } from "./route.entity";

@Entity()
export class RouteList {
    @PrimaryGeneratedColumn()
    routeId: number;

    @Column()
    routeName: string;

    @OneToMany(() => Route, route => route.route, { eager: true })
    routeData: Route
}
