import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "common/auth/role.decorator";
import { RolesGuard } from "common/auth/role.guard";
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
    getSingleRoute(@Param('id') id: number) {
        return this.routeService.getSingleRoute(id)
    }

    @Roles(2)
    @UseGuards(RolesGuard)
    @Post()
    addRoute(@Body() body: InsertRouteListDto) {
        return this.routeService.addSingleRoute(body);
    }
    @Roles(2)
    @UseGuards(RolesGuard)
    @Patch(':id')
    updateRoute(@Param('id') id: number, @Body() body: InsertRouteListDto) {
        return this.routeService.updateRoute(id, body);
    }
    @Roles(3)
    @UseGuards(RolesGuard)
    @Delete(':id')
    deleteRoute(@Param('id') id: number) {
        return this.routeService.deleteRoute(id);
    }

}
