import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Roles } from "common/auth/role.decorator";
import { RolesGuard } from "common/auth/role.guard";
import { InsertFlightListDto } from "common/dto/flight-list/flight-list.insert.dto";
import { UpdateFlightListDto } from "common/dto/flight-list/flight-list.update.dto";
import { FlightResultAddFormDto, FlightResultUpdateFormDto } from "common/dto/flight-result.form.dto";
import { FlightList } from "entities/flight-list.entity";
import { ResultService } from "domain/flight/result/result.service";
import { ListService } from "./list.service";
import { Request } from "express";
import { printWinstonLog } from "logger/logger.factory";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Controller('flight/list')
@ApiTags('비행검사 목록 API')
export class ListController {
    constructor(private readonly listService: ListService,
        private readonly resultService: ResultService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
    }

    @Get()
    // @Roles(1)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: '전체 목록 조회', description: '전체 목록 조회시에는 data가 없음.' })
    @ApiOkResponse({ type: [FlightList], description: '비행검사 전체 조회 성공' })
    getAllList(@Req() req: Request) {
        printWinstonLog(this.logger, {
            ip: req.ip,
            module: ListController.name,
            message: `[GET] Entire Lists`
        }, 'info')
        try {
            return this.listService.getAllList();
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: req.ip,
                module: ListController.name,
                message: `[GET] Failed to Get Entire List`
            }, 'error')
        }
    }

    @Get(':id')
    @ApiOperation({ summary: '비행검사 단일 조회', description: '비행검사 단일 항목 조회' })
    @ApiOkResponse({ type: FlightList, description: '비행검사 단일 조회 성공' })
    @ApiNotFoundResponse({ description: '해당하는 ID가 존재하지 않음' })
    @ApiQuery({
        name:'p',
        required:false,
    })
    getOneItem(@Param('id') id: number, @Req() req: Request, @Query('p') page: number) {
        printWinstonLog(this.logger, {
            ip: req.ip,
            module: ListController.name,
            message: `[GET] ${id} List and Results`
        }, 'info')
        try {
            return this.listService.getOneItem(id, page);
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: req.ip,
                module: ListController.name,
                message: `[GET] Failed to Get ${id}'s List and Results`
            }, 'error')
        }
    }

    @Post()
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: '비행 검사 추가', description: ' 비행 검사 결과 추가' })
    @ApiOkResponse({ type: Number, description: '비행검사 전체 조회 성공' })
    @ApiBadRequestResponse({ description: '요청 형식이 잘못됨' })
    async addFlightList(@Body() body: FlightResultAddFormDto, @Req() req: Request) {
        printWinstonLog(this.logger, {
            ip: req.ip,
            module: ListController.name,
            message: `[POST] Add new flight List and Results`
        }, 'info')
        try {
            const id = await this.listService.addFlightList(body);

            body.data = body.data.map(t => { if (id) { t.testId = id; } return t });

            return await this.resultService.addFlightResult(body.data);
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: req.ip,
                module: ListController.name,
                message: `[POST] Failed to Add flight List and Results`
            }, 'error')
        }

    }

    @Patch(':id')
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: '비행검사 수정', description: '비행검사 명칭 및 타입 등 수정할 때 사용' })
    @ApiOkResponse({ type: Number, description: '비행검사 수정 성공' })
    @ApiNotFoundResponse({ description: '해당하는 ID가 존재하지 않음' })
    @ApiBadRequestResponse({ description: '요청 형식이 잘못됨' })
    async updateFlightList(@Param('id') id: number, @Body() body: UpdateFlightListDto, @Req() req: Request) {
        printWinstonLog(this.logger, {
            ip: req.ip,
            module: ListController.name,
            message: `[PATCH] Update Flight List ID : ${id}`
        }, 'info')
        try {
            if (Object.keys(body).filter(t => t === 'data').length) { delete body['data']; console.log('deleted') }
            return await this.listService.updateFlightList(id, body);
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: req.ip,
                module: ListController.name,
                message: `[PATCH] Failed to Update Flight List ID : ${id}`
            }, 'error')
        }
    }

    @Delete(':id')
    @Roles(3)
    @UseGuards(RolesGuard)
    @ApiOperation({ summary: '비행검사 삭제', description: '비행검사 항목 삭제할 때 사용' })
    @ApiNotFoundResponse({ description: '해당하는 ID가 존재하지 않음' })
    deleteFlightList(@Param('id') id: number, @Req() req: Request) {
        try {
            printWinstonLog(this.logger, {
                ip: req.ip,
                module: ListController.name,
                message: `[DELETE] Flight List ID : ${id}`
            }, 'info')
            return this.listService.deleteFlightList(id);
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: req.ip,
                module: ListController.name,
                message: `[DELETE] Failed to Delete Flight List ID : ${id}`
            }, 'error')
        }
    }


}
