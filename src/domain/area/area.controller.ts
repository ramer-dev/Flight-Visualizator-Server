import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "common/auth/role.decorator";
import { RolesGuard } from "common/auth/role.guard";
import { InsertAreaDto } from "common/dto/area/area.insert.dto";
import { UpdateAreaDto } from "common/dto/area/area.update.dto";
import { Area } from "entities/area.entity";
import { Request } from "express";
import { printWinstonLog } from "logger/logger.factory";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { AreaService } from "./area.service";

@Controller('area')
@ApiTags('공역 API')
export class AreaController {
    constructor(private readonly areaService: AreaService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) { }


    @Get()
    @ApiOperation({ description: '공역 조회, 페이지 기능 있음', summary: '공역 조회' })
    @ApiOkResponse({
        type: [Area],
        description: '공역 조회 성공'
    })
    getEntireArea(@Query('valid') valid: boolean, @Req() req: Request) {
        printWinstonLog(this.logger, {
            message: `[GET] Entire Area`,
            module: AreaController.name,
            ip: req.ip
        }, 'info')

        try {
            if (valid) return this.areaService.getValidArea();
            else return this.areaService.getEntireArea();
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[GET] Failed to Get Entire Area`,
                module: AreaController.name,
                ip: req.ip
            }, 'error')
        }
    }

    @Post()
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({ description: '공역 추가', summary: '공역 추가' })
    @ApiOkResponse({
        type: Number,
        description: '공역 추가 성공'
    })
    addArea(@Body() body: InsertAreaDto, @Req() req: Request) {
        printWinstonLog(this.logger, {
            message: `[POST] Add Area : ${body.areaName}`,
            module: AreaController.name,
            ip: req.ip
        }, 'info')
        try {
            return this.areaService.addArea(body);
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[POST] Failed to Add Area : ${body.areaName}`,
                module: AreaController.name,
                ip: req.ip
            }, 'error')
        }
    }

    @Patch(':id')
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({ description: '공역 수정, body 요소는 전부 선택요소임', summary: '공역 수정' })
    @ApiOkResponse({
        type: Number,
        description: '공역 수정 성공'
    })
    @ApiNotFoundResponse({
        description: '공역 수정 실패. 해당 ID 존재하지 않음.'
    })
    updateArea(@Param('id') id: number, @Body() body: UpdateAreaDto, @Req() req : Request) {
        printWinstonLog(this.logger, {
            message: `[PATCH] Update Area : ${body.areaName}`,
            module: AreaController.name,
            ip: req.ip
        }, 'info')
        try {
            return this.areaService.updateArea(id, body);
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[PATCH] Failed to Add Area : ${body.areaName}`,
                module: AreaController.name,
                ip: req.ip
            }, 'error')
        }
    }

    @Delete(':id')
    @Roles(3)
    @UseGuards(RolesGuard)
    @ApiOperation({ description: '공역 삭제', summary: '공역 삭제' })
    @ApiOkResponse({
        type: Number,
        description: '공역 수정 성공'
    })
    @ApiNotFoundResponse({
        description: '공역 삭제 실패. 해당 ID 존재하지 않음.'
    })
    deleteArea(@Param('id') id: number, @Req() req: Request) {
        printWinstonLog(this.logger, {
            message: `[DELETE] Delete Area : ${id}`,
            module: AreaController.name,
            ip: req.ip
        }, 'info')

        try {
            return this.areaService.deleteArea(id)
        } catch (e) {
            console.error(e)
            printWinstonLog(this.logger, {
                message: `[DELETE] Failed to Delete Area : ${id}`,
                module: AreaController.name,
                ip: req.ip
            }, 'error')
        }
    }

}
