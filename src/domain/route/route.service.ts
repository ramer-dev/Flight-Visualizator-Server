import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertRouteListDto } from "common/dto/route/route-list.insert.dto";
import { InsertRouteDto } from "common/dto/route/route.insert.dto";
import { RouteList } from "entities/route-list.entity";
import { Route } from "entities/route.entity";
import { Repository } from "typeorm";

@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>,
        @InjectRepository(RouteList)
        private readonly routeListRepository: Repository<RouteList>
    ) { }

    getEntireRoute() {
        return this.routeListRepository.find({ relations: ['routeData', 'routeData.routePointData'] });
    }

    getSingleRoute(id: number) {
        return this.routeListRepository.findOne({ where: { routeId: id }, relations: ['routeData', 'routeData.routePointData'] });
    }

    // 1. list data를 insert
    // 2. entry data insert
    async addSingleRoute(body: InsertRouteListDto) {
        const { routeName, routeData } = body;

        await this.routeListRepository.insert({ routeName });
        return await this.routeRepository.insert(routeData)
    }

    // async updateRoute(body:)
}
