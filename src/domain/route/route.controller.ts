import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InsertRouteListDto } from "common/dto/route/route-list.insert.dto";
import { UpdateRouteListDto } from "common/dto/route/route-list.update.dto";
import { RouteService } from "./route.service";

@Controller('route')
@ApiTags('항로 API')
export class RouteController {
    constructor(
        private readonly routeService: RouteService,
    ) { }

    @Get()
    getEntireRoute() {
        return this.routeService.getEntireRoute();
    }

    @Get(':id')
    getSingleRoute(@Param('id') id : number) {
        return this.routeService.getSingleRoute(id)
    }

    @Post()
    addRoute(@Body() body : InsertRouteListDto){
        return this.routeService.addSingleRoute(body);
    }

    @Patch(':id')
    updateRoute(@Param('id') id : number, @Body() body : UpdateRouteListDto){
        return this.routeService.updateRoute(id, body);
    }

}
