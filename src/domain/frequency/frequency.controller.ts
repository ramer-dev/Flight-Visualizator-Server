import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "common/auth/role.decorator";
import { RolesGuard } from "common/auth/role.guard";
import { InsertFrequencyDto } from "common/dto/frequency/frequency.insert.dto";
import { UpdateFrequencyDto } from "common/dto/frequency/frequency.update.dto";
import { FrequencyService } from "./frequency.service";

@Controller('freq')
@ApiTags('주파수 API')
export class FrequencyController {
    constructor(
        private readonly freqService: FrequencyService,
    ) { }

    @Get()
    getEntireFreq() {
        return this.freqService.getEntireFreq();
    }

    @Get(':id')
    getSingleFreq(@Param('id') id : number){
        return this.freqService.getSingleFreq(id);
    }

    @Post()
    addFreq(@Body() body: InsertFrequencyDto) {
        return this.freqService.addFreq(body);
    }

    @Roles(2)
    @UseGuards(RolesGuard)
    @Patch(':id')
    updateFreq(@Param('id') id: number, @Body() body: UpdateFrequencyDto) {
        return this.freqService.updateFreq(id, body)
    }

    @Roles(3)
    @UseGuards(RolesGuard)
    @Delete(':id')
    deleteFreq(@Param('id') id: number) {
        return this.freqService.deleteFreq(id);
    }
}