import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RouteList } from "entities/route-list.entity";
import { Route } from "entities/route.entity";
import { Repository } from "typeorm";

@Injectable()
export class RouteListService {
    constructor(
        @InjectRepository(RouteList)
        private readonly routeRepository: Repository<RouteList>
    ) { }

    getEntireRoute() { 
        // return this.routeRepository.find({relations:['routePoint']});
        return this.routeRepository.find({})
    }
}
