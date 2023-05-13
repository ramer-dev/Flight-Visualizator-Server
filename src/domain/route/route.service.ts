import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Route } from "entities/route.entity";
import { Repository } from "typeorm";

@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>
    ) { }

    getEntireRoute() { 
        return this.routeRepository.find({relations:['routePoint', 'route']});
    }
}
