import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "common/auth/role.decorator";
import { RolesGuard } from "common/auth/role.guard";
import { InsertFixPointDto } from "common/dto/fix-point/fix-point.insert.dto";
import { UpdateFixPointDto } from "common/dto/fix-point/fix-point.update.dto";
import { FixPoint } from "entities/fix-point.entity";
import { Request } from "express";
import { printWinstonLog } from "logger/logger.factory";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { RealIP } from "nestjs-real-ip";
import { FixPointService } from "./fix-point.service";

@Controller('point')
@ApiTags('픽스점 API')
export class FixPointController {
    constructor(private readonly fixPointService: FixPointService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

    @Get(':id')
    @ApiOperation({ summary: '단일 픽스점 리턴', description: '픽스점 id 또는 이름을 입력하면 해당 픽스점의 정보를 반환한다.' })
    @ApiOkResponse({ type: FixPoint, description: '픽스점 리턴 성공' })
    @ApiInternalServerErrorResponse({ description: '서버 에러이거나 검색한 쿼리에 따른 값이 존재하지 않음.' })
    getSingleFixPoint(@Param('id') id: number, @RealIP() ip: string) {
        printWinstonLog(this.logger, {
            message: `[GET] Single Fix Point ID : ${id}`,
            module: FixPointController.name,
            ip: ip
        }, 'info')
        try {
            return this.fixPointService.getSingleFixPoint(id);
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[GET] Failed to Get Fix Point ID : ${id}`,
                module: FixPointController.name,
                ip: ip
            }, 'error')
        }
    }

    @Get()
    @ApiOperation({ summary: '전체 픽스점 리턴', description: '전체 픽스점의 정보를 반환한다.' })
    @ApiOkResponse({ type: [FixPoint], description: '전체 픽스점의 정보를 리턴한다.' })
    getEntireFixPoint(@RealIP() ip: string) {
        printWinstonLog(this.logger, {
            message: `[GET] Entire Fix Point`,
            module: FixPointController.name,
            ip: ip
        }, 'info')
        try {
            return this.fixPointService.getEntireFixPoint();
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[GET] Failed to Get Entire Fix Point`,
                module: FixPointController.name,
                ip: ip
            }, 'info')
        }
    }


    @Post()
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: '픽스점 생성', description: 'body로 입력해준 정보대로 픽스점을 생성한다.' })
    @ApiOkResponse({ description: '픽스점 생성 성공' })
    @ApiBadRequestResponse({ description: '픽스점 생성 실패. body 입력 정보를 확인해주세요.' })
    @ApiInternalServerErrorResponse({ description: '서버 에러이거나 이미 등록된 픽스점일 수 있음.' })
    createFixPoint(@Body() body: InsertFixPointDto, @RealIP() ip: string) {
        printWinstonLog(this.logger, {
            message: `[POST] Add Fix Point : ${body.pointName}`,
            module: FixPointController.name,
            ip: ip
        }, 'info')
        try {
            return this.fixPointService.createFixPoint(body);
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[POST] Failed to Add Fix Point : ${body.pointName}`,
                module: FixPointController.name,
                ip: ip
            }, 'error')
        }
    }

    @Patch(':id')
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: '픽스점 수정', description: 'body로 입력해준 정보대로 픽스점을 수정한다.' })
    @ApiOkResponse({ description: '픽스점 수정 성공' })
    @ApiBadRequestResponse({ description: '픽스점 수정 실패. body 입력 정보를 확인해주세요.' })
    updateFixPoint(@Param('id') id: number, @Body() body: UpdateFixPointDto, @RealIP() ip: string) {
        printWinstonLog(this.logger, {
            message: `[PATCH] Update Fix Point : ${body.pointName}`,
            module: FixPointController.name,
            ip: ip
        }, 'info')
        try {
            return this.fixPointService.updateFixPoint(id, body);
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[PATCH] Failed to Update Fix Point : ${body.pointName}`,
                module: FixPointController.name,
                ip: ip
            }, 'error')
        }
    }

    @Delete(':id')
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: '픽스점 삭제', description: '입력한 id의 픽스점을 삭제한다.' })
    @ApiOkResponse({ description: '픽스점 삭제 성공' })
    deleteFixPoint(@Param('id') id: number, @RealIP() ip: string) {
        printWinstonLog(this.logger, {
            message: `[DELETE] Fix Point : ${id}`,
            module: FixPointController.name,
            ip: ip
        }, 'info')
        try {
            return this.fixPointService.deleteFixPoint(id);
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[DELETE] Failed to Delete Fix Point : ${id}`,
                module: FixPointController.name,
                ip: ip
            }, 'error')
        }
    }
}