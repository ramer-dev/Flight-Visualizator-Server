import { Body, Controller, Get, Param, Post, Patch, UseGuards, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "common/auth/jwt.guard";
import { Roles } from "common/auth/role.decorator";
import { RolesGuard } from "common/auth/role.guard";
import { InsertFlightResultDto } from "common/dto/flightResult/flightResult.insert.dto";
import { UpdateFlightResultDto } from "common/dto/flightResult/flightResult.update.dto";
import { FlightResultFormDto } from "common/dto/flightResultForm.dto";
import { SearchDto } from "common/dto/search.dto";
import { FlightResult } from "entities/flightResult.entity";
import { ResultService } from "./result.service";


@Controller('flight/result')
@ApiTags('비행검사 결과 조회')
export class ResultController {
    constructor(private readonly resultService: ResultService) { }

    @Get()
    getFlightResultAll(@Body('name') name: string, @Body('limit') limit: number, @Body('page') page: number) {
        return this.resultService.getAllResult(limit, page);
    }

    @Get('search')
    getSearchResult(@Body() body: SearchDto) {
        return this.resultService.getSearchResult(body);
    }


    @Get(':id')
    getSpecificResult(@Param('id') id: number, @Body('limit') limit: number, @Body('page') page: number) {
        return this.resultService.getSpecificResult(id, limit, page);
    }


    @Post()
    // @Roles(1)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    AddFlightResult(@Body() body: InsertFlightResultDto[]) {
        return this.resultService.addFlightResult(body);
    }

    @Patch(':id')
    // @Roles(1)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    UpdateFlightResult(@Param('id') id: number, @Body() body: UpdateFlightResultDto) {
        return this.resultService.updateFlightResult(id, body);
    }

    @Delete()
    // @Roles(1)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    DeleteFlightResult(@Body('id') id : number[]) {
        return this.resultService.deleteFlightResult(id)
    }
}
