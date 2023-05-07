import { Body, Controller, Get, Param, Post, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InsertFlightResultDto } from "common/dto/flightResult.insert.dto";
import { UpdateFlightResultDto } from "common/dto/flightResult.update.dto";
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
    AddFlightResult(@Body() body: FlightResultFormDto) {
        return this.resultService.addFlightResult(body);
    }

    @Patch(':id')
    UpdateFlightResult(@Param('id') id: number, @Body() body: UpdateFlightResultDto) {
        console.log(body);
        return this.resultService.updateFlightResult(id, body);
    }

}
