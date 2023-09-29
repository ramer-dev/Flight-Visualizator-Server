import { Body, Controller, Get, Param, Post, Patch, UseGuards, Delete, Query, Inject, Logger, Req } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "common/auth/role.decorator";
import { RolesGuard } from "common/auth/role.guard";
import { InsertFlightResultDto } from "common/dto/flight-result/flight-result.insert.dto";
import { UpdateFlightResultDto } from "common/dto/flight-result/flight-result.update.dto";
import { FlightResultAddFormDto } from "common/dto/flight-result.form.dto";
import { SearchDto } from "common/dto/search.dto";
import { FlightResult } from "entities/flight-result.entity";
import { ResultService } from "./result.service";
import { PointType } from "common/dto/coordinate.types";
import { printWinstonLog } from "logger/logger.factory";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Request } from "express";
import { RealIP } from "nestjs-real-ip";


@Controller('flight/result')
@ApiTags('비행검사 결과 API')
export class ResultController {
    constructor(private readonly resultService: ResultService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

    @Get()
    @ApiOperation({ summary: "비행검사 결과 전체 조회", description: "비행검사 결과 전체 조회, 페이징 기능 있음" })
    @ApiOkResponse({ type: [FlightResult], description: '비행검사 결과 전체 조회 성공' })
    getFlightResultAll(@RealIP() ip: string, @Query('take') take: number) {
        printWinstonLog(this.logger, {
            ip: ip,
            module: ResultController.name,
            message: `[GET] Entire Results`
        }, 'info')
        try {
            return this.resultService.getAllResult(take);
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: ip,
                module: ResultController.name,
                message: `[GET] Failed to Get Entire Results`
            }, 'error')
        }
    }

    @Get('search')
    @ApiOperation({ summary: "비행검사 결과 검색", description: "비행검사 결과 검색" })
    @ApiOkResponse({ type: [FlightResult], description: "비행검사 결과 검색 성공" })
    @ApiBadRequestResponse({ description: 'body 형식이 올바르지 않음' })
    getSearchResult(@Body() body: SearchDto, @RealIP() ip: string) {
        printWinstonLog(this.logger, {
            ip: ip,
            module: ResultController.name,
            message: `[GET] Search Results`
        }, 'info')
        try {
            return this.resultService.getSearchResult(body);
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: ip,
                module: ResultController.name,
                message: `[GET] Failed to Get Search Results`
            }, 'error')
        }
    }

    @Post('nearby')
    @ApiOperation({ summary: "비행검사 좌표 분석", description: "비행검사 결과 삭제" })
    @ApiOkResponse({ type: Number, description: "비행검사 결과 삭제 성공" })
    @ApiNotFoundResponse({ description: 'id가 존재하지 않음' })
    findPointsWithinRadius(@RealIP() ip: string, @Body('point') point: PointType, @Body('distance') distance: number) {
        printWinstonLog(this.logger, {
            ip: ip,
            module: ResultController.name,
            message: `[POST] Get Nearby Results : (${point.lat}|${point.lng}) ${distance}`
        }, 'info')
        try {
            return this.resultService.findPointsWithinRadius(point, distance);
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: ip,
                module: ResultController.name,
                message: `[POST] Failed to Get NearbyResults`
            }, 'error')
        }
    }

    @Get(':id')
    @ApiOperation({ summary: "비행검사 결과 단일 조회", description: "비행검사 testID에 해당하는 결과 조회" })
    @ApiOkResponse({ type: FlightResult, description: "비행검사 결과 단일 조회 성공" })
    @ApiBadRequestResponse({ description: 'body 형식이 올바르지 않음' })
    @ApiNotFoundResponse({ description: "ID를 찾을 수 없음" })
    getSpecificResult(@RealIP() ip: string, @Param('id') id: number, @Body('limit') limit: number, @Body('page') page: number) {

        printWinstonLog(this.logger, {
            ip: ip,
            module: ResultController.name,
            message: `[GET] Get Single Result`
        }, 'info')
        try {
            return this.resultService.getSpecificResult(id);
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: ip,
                module: ResultController.name,
                message: `[GET] Failed to Get Single Result`
            }, 'error')
        }
    }


    @Post()
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: "비행검사 결과 추가", description: "비행검사 결과 추가" })
    @ApiOkResponse({ type: Number, description: "비행검사 결과 추가 성공" })
    @ApiBadRequestResponse({ description: 'body 형식이 올바르지 않음' })
    @ApiBody({ type: [InsertFlightResultDto] })
    AddFlightResult(@RealIP() ip: string, @Body() body: InsertFlightResultDto[]) {
        printWinstonLog(this.logger, {
            ip: ip,
            module: ResultController.name,
            message: `[POST] Add ${body.length}EA Flight Result`
        }, 'info')
        try {
            return this.resultService.addFlightResult(body);
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: ip,
                module: ResultController.name,
                message: `[POST] Failed Add ${body.length}EA Flight Result`
            }, 'error')
        }
    }

    @Patch()
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: "비행검사 결과 수정", description: "비행검사 결과 수정" })
    @ApiOkResponse({ type: Number, description: "비행검사 결과 수정 성공" })
    @ApiBadRequestResponse({ description: 'body 형식이 올바르지 않음' })
    UpdateFlightResult(@RealIP() ip: string, @Body() body: UpdateFlightResultDto[]) {
        printWinstonLog(this.logger, {
            ip: ip,
            module: ResultController.name,
            message: `[PATCH] Update ${body.length}EA Flight Result`
        }, 'info')
        try {

            const testId = body[0].testId
            return this.resultService.updateFlightResult(body, testId);
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: ip,
                module: ResultController.name,
                message: `[PATCH] Failed to Update ${body.length}EA Flight Result`
            }, 'error')
        }
    }

    @Patch(':id')
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: "비행검사 결과 수정", description: "비행검사 결과 수정" })
    @ApiOkResponse({ type: Number, description: "비행검사 결과 수정 성공" })
    @ApiBadRequestResponse({ description: 'body 형식이 올바르지 않음' })
    UpdateCoordData(@RealIP() ip: string, @Body() body: UpdateFlightResultDto, @Param('id') id: number) {
        printWinstonLog(this.logger, {
            ip: ip,
            module: ResultController.name,
            message: `[PATCH] Update Flight Result Point | ID : ${id}`
        }, 'info')
        try {
            return this.resultService.updateCoordData(body, id);
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: ip,
                module: ResultController.name,
                message: `[PATCH] Failed to Update Flight Result Point | ID : ${id}`
            }, 'error')
        }
    }

    @Delete()
    @Roles(3)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: "비행검사 결과 삭제", description: "비행검사 결과 삭제" })
    @ApiOkResponse({ type: Number, description: "비행검사 결과 삭제 성공" })
    @ApiNotFoundResponse({ description: 'id가 존재하지 않음' })
    // @Roles(1)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    DeleteFlightResult(@RealIP() ip: string, @Body('id') id: number[]) {
        printWinstonLog(this.logger, {
            ip: ip,
            module: ResultController.name,
            message: `[DELETE] Flight Result | ID : ${id}`
        }, 'info')
        try {
            return this.resultService.deleteFlightResult(id)
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: ip,
                module: ResultController.name,
                message: `[DELETE] Failed to Delete Flight Result | ID : ${id}`
            }, 'error')
        }
    }

}
