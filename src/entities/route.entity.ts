import { Entity, PrimaryColumn, Column, ManyToMany, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { FixPoint } from './fix-point.entity';
import { RouteList } from './route-list.entity';

@Entity()
export class Route {
    @PrimaryColumn()
    routeId: number;

    @Column()
    routeName: string;

    // @Column()
    // fixPoint: string;

    @Column()
    routeEntry: number;

    @Column()
    minHeight: number;

    @Column()
    maxHeight: number;

    @Column()
    routeArea: string;

    @Column()
    routeType: string;

    @ManyToOne(() => FixPoint, fp => fp.pointName, { eager: true })
    @JoinColumn({
        name: 'route_point',
        referencedColumnName: 'pointName'
    })
    routePoint: FixPoint[]

    @ManyToOne(() => RouteList, rl => rl.routeData)
    @JoinColumn({
        name: 'route_name',
        referencedColumnName: 'routeName'
    })
    route:RouteList
} 