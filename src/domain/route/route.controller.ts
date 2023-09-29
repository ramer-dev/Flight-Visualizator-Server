import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "common/auth/role.decorator";
import { RolesGuard } from "common/auth/role.guard";
import { InsertRouteListDto } from "common/dto/route/route-list.insert.dto";
import { UpdateRouteListDto } from "common/dto/route/route-list.update.dto";
import { Request } from "express";
import { printWinstonLog } from "logger/logger.factory";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { RealIP } from "nestjs-real-ip";
import { RouteService } from "./route.service";

@Controller('route')
@ApiTags('항로 API')
export class RouteController {
    constructor(
        private readonly routeService: RouteService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) { }

    @Get()
    getEntireRoute(@RealIP() ip: string) {
        printWinstonLog(this.logger, {
            message: `[GET] Entire Route`,
            module: RouteController.name,
            ip: ip
        }, 'info')
        try {
            return this.routeService.getEntireRoute();
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[GET] Failed to Get Entire Route`,
                module: RouteController.name,
                ip: ip
            }, 'error')
        }
    }

    @Get(':id')
    getSingleRoute(@Param('id') id: number, @RealIP() ip: string) {
        printWinstonLog(this.logger, {
            message: `[GET] Single Route | id : ${id}`,
            module: RouteController.name,
            ip: ip
        }, 'info')
        try {
            return this.routeService.getSingleRoute(id)
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[GET] Failed to Get Single Route | id : ${id}`,
                module: RouteController.name,
                ip: ip
            }, 'error')
        }
    }

    @Roles(2)
    @UseGuards(RolesGuard)
    @Post()
    addRoute(@Body() body: InsertRouteListDto, @RealIP() ip: string) {
        printWinstonLog(this.logger, {
            message: `[POST] Add Route ${body.routeName}}`,
            module: RouteController.name,
            ip: ip
        }, 'info')
        try {
            return this.routeService.addSingleRoute(body);
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[POST] Failed to Add Route ${body.routeName}`,
                module: RouteController.name,
                ip: ip
            }, 'error')
        }
    }
    @Roles(2)
    @UseGuards(RolesGuard)
    @Patch(':id')
    updateRoute(@Param('id') id: number, @Body() body: InsertRouteListDto, @RealIP() ip: string) {
        printWinstonLog(this.logger, {
            message: `[PATCH] Update Route ${body.routeName}}`,
            module: RouteController.name,
            ip: ip
        }, 'info')
        try {
            return this.routeService.updateRoute(id, body);
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[PATCH] Failed to Update Route ${body.routeName}`,
                module: RouteController.name,
                ip: ip
            }, 'error')
        }
    }
    @Roles(3)
    @UseGuards(RolesGuard)
    @Delete(':id')
    deleteRoute(@Param('id') id: number, @RealIP() ip: string) {
        printWinstonLog(this.logger, {
            message: `[DELETE] Route | id : ${id}`,
            module: RouteController.name,
            ip: ip
        }, 'info')
        try {
            return this.routeService.deleteRoute(id);
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[DELETE] Failed to Delete Route | id : ${id}`,
                module: RouteController.name,
                ip: ip
            }, 'error')
        }
    }

}
