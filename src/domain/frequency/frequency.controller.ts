import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "common/auth/role.decorator";
import { RolesGuard } from "common/auth/role.guard";
import { InsertFrequencyDto } from "common/dto/frequency/frequency.insert.dto";
import { UpdateFrequencyDto } from "common/dto/frequency/frequency.update.dto";
import { ResultController } from "domain/flight/result/result.controller";
import { Request } from "express";
import { printWinstonLog } from "logger/logger.factory";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { RealIP } from "nestjs-real-ip";
import { FrequencyService } from "./frequency.service";

@Controller('freq')
@ApiTags('주파수 API')
export class FrequencyController {
    constructor(
        private readonly freqService: FrequencyService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) { }

    @Get()
    getEntireFreq(@RealIP() ip: string) {
        printWinstonLog(this.logger, {
            ip: ip,
            module: FrequencyController.name,
            message: `[GET] Entire Frequency`
        }, 'info')
        try {
            return this.freqService.getEntireFreq();
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: ip,
                module: FrequencyController.name,
                message: `[GET] Failed to Get Entire Frequency`
            }, 'error')
        }

    }

    @Get(':id')
    getSingleFreq(@RealIP() ip: string, @Param('id') id: number) {
        printWinstonLog(this.logger, {
            ip: ip,
            module: FrequencyController.name,
            message: `[GET] Single Frequency ID : ${id}`
        }, 'info')
        try {
            return this.freqService.getSingleFreq(id);
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: ip,
                module: FrequencyController.name,
                message: `[GET] Failed to Get Single Frequency ID : ${id}`
            }, 'error')
        }
    }

    @Post()
    addFreq(@RealIP() ip: string, @Body() body: InsertFrequencyDto) {
        printWinstonLog(this.logger, {
            ip: ip,
            module: FrequencyController.name,
            message: `[POST] Add Frequency ${body.frequency}`
        }, 'info')
        try {
            return this.freqService.addFreq(body);
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: ip,
                module: FrequencyController.name,
                message: `[POST] Failed to Add Frequency ${body.frequency}`
            }, 'error')
        }
    }

    @Roles(2)
    @UseGuards(RolesGuard)
    @Patch(':id')
    updateFreq(@RealIP() ip: string, @Param('id') id: number, @Body() body: UpdateFrequencyDto) {
        printWinstonLog(this.logger, {
            ip: ip,
            module: FrequencyController.name,
            message: `[PATCH] Update Frequency ${body.frequency}`
        }, 'info')
        try {
            return this.freqService.updateFreq(id, body)
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: ip,
                module: FrequencyController.name,
                message: `[PATCH] Failed to Update Frequency ${body.frequency}`
            }, 'error')
        }
    }

    @Roles(3)
    @UseGuards(RolesGuard)
    @Delete(':id')
    deleteFreq(@RealIP() ip: string, @Param('id') id: number) {
        printWinstonLog(this.logger, {
            ip: ip,
            module: FrequencyController.name,
            message: `[DELETE] Frequency | id : ${id}`
        }, 'info')
        try {
            return this.freqService.deleteFreq(id);
        } catch (e) {
            printWinstonLog(this.logger, {
                ip: ip,
                module: FrequencyController.name,
                message: `[PATCH] Failed to Delete Frequency | id : ${id}`
            }, 'error')
        }
    }
}