import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'common/auth/role.decorator';
import { RolesGuard } from 'common/auth/role.guard';
import { InsertSectorDto } from 'common/dto/sector/sector.insert.dto';
import { UpdateSectorDto } from 'common/dto/sector/sector.update.dto';
import { Sector } from 'entities/sector.entity';
import { Request } from 'express';
import { printWinstonLog } from 'logger/logger.factory';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AreaService } from '../area/area.service';
import { SectorService } from './sector.service';

@ApiTags('섹터 API')
@Controller('sector')
export class SectorController {
    constructor(private readonly sectorService: SectorService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

    @Get(':id')
    @ApiOperation({ summary: "섹터 조회", description: "섹터 조회" })
    @ApiNotFoundResponse({ description: 'id가 존재하지 않음' })
    @ApiOkResponse({ type: [Sector], description: '섹터 조회 성공' })
    getSingleSector(@Param('id') id: number, @Req() req: Request) {
        printWinstonLog(this.logger, {
            message: `[GET] Single Sector | id : ${id}`,
            module: SectorController.name,
            ip: req.ip
        }, 'info')
        try {
            return this.sectorService.getSingleSector(id);

        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[GET] Failed to Get Single Sector | id : ${id}`,
                module: SectorController.name,
                ip: req.ip
            }, 'error')
        }
    }

    @Get()
    @ApiOperation({ summary: "섹터 전체 조회", description: "섹터 전체 조회" })
    @ApiOkResponse({ type: [Sector], description: '섹터 전체 조회 성공' })
    getEntireSector(@Req() req: Request) {
        printWinstonLog(this.logger, {
            message: `[GET] Entire Sector}`,
            module: SectorController.name,
            ip: req.ip
        }, 'info')
        try {
            return this.sectorService.getEntireSector();

        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[GET] Failed to Get Entire Sector`,
                module: SectorController.name,
                ip: req.ip
            }, 'error')
        }
    }
    @Roles(2)
    @UseGuards(RolesGuard)
    @Post()
    @ApiOperation({ summary: "섹터 추가", description: "섹터 추가" })
    @ApiOkResponse({ type: [Sector], description: "섹터 추가 성공" })
    @ApiBadRequestResponse({ description: 'body 형식이 올바르지 않음' })
    createSector(@Body() body: InsertSectorDto, @Req() req: Request) {
        printWinstonLog(this.logger, {
            message: `[POST] Add Sector ${body.sectorName}`,
            module: SectorController.name,
            ip: req.ip
        }, 'info')
        try {
            body.sectorData.push(body.sectorData[0]);
            return this.sectorService.createSector(body);
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[POST] Failed to Add Sector ${body.sectorName}`,
                module: SectorController.name,
                ip: req.ip
            }, 'error')
        }
    }

    @Roles(2)
    @UseGuards(RolesGuard)
    @Patch(':id')
    @ApiOperation({ summary: "섹터 수정", description: "섹터 수정" })
    @ApiOkResponse({ type: Number, description: "섹터 수정 성공" })
    @ApiNotFoundResponse({ description: 'id가 존재하지 않음' })
    @ApiBadRequestResponse({ description: 'body 형식이 올바르지 않음' })
    updateSector(@Param('id') id: number, @Body() body: UpdateSectorDto, @Req() req: Request) {
        printWinstonLog(this.logger, {
            message: `[PATCH] Update Sector ${body.sectorName}`,
            module: SectorController.name,
            ip: req.ip
        }, 'info')
        try {
            if (JSON.stringify(body.sectorData[0]) !== JSON.stringify(body.sectorData.at(-1)))
                body.sectorData.push(body.sectorData[0]);
            return this.sectorService.updateSector(id, body);
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[PATCH] Failed to Update Sector ${body.sectorName}`,
                module: SectorController.name,
                ip: req.ip
            }, 'error')
        }
    }
    @Roles(2)
    @UseGuards(RolesGuard)
    @Delete(':id')
    @ApiOperation({ summary: "섹터 삭제", description: "섹터 삭제" })
    @ApiOkResponse({ type: Number, description: "섹터 삭제 성공" })
    @ApiNotFoundResponse({ description: 'id가 존재하지 않음' })
    deleteSector(@Param('id') id: number, @Req() req: Request) {
        printWinstonLog(this.logger, {
            message: `[DELETE] Delete Sector | id : ${id}`,
            module: SectorController.name,
            ip: req.ip
        }, 'info')
        try {
            return this.sectorService.deleteSector(id);
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[DELETE] Failed to Delete Sector | id : ${id}`,
                module: SectorController.name,
                ip: req.ip
            }, 'error')
        }
    }
}
