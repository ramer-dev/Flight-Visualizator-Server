import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FlightResultFormDto } from "common/dto/flightResultForm.dto";
import { SearchDto } from "common/dto/search.dto";
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
    getSearchResult(@Body() body:SearchDto){
        return this.resultService.getSearchResult(body);
    }


    @Get(':id')
    getSpecificResult(@Param('id') id: number, @Body('limit') limit: number, @Body('page') page: number) {
        return this.resultService.getSpecificResult(id, limit, page);
    }


    @Post()
    AddFlightResult(@Body() body:FlightResultFormDto){
        return this.resultService.addFlightResult(body);
    }

}
