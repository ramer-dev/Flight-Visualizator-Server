import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RouteListService } from "./route-list.service";
import { RouteService } from "./route.service";

@Controller('route')
@ApiTags('항로 API')
export class RouteController {
    constructor(
        private readonly routeService: RouteService,
        private readonly routeListService : RouteListService
    ) { }

    @Get()
    getEntireRoute() {
        return this.routeListService.getEntireRoute();
    }

}
