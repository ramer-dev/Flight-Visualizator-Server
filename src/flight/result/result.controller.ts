import { Body, Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResultService } from "./result.service";

@Controller('flight/result')
@ApiTags('비행검사 결과 조회')
export class ResultController {
    constructor(private readonly resultService: ResultService) { }

    @Get()
    getFlightResultAll(@Body('name') name: string, @Body('limit') limit: number, @Body('page') page: number) {
        return this.resultService.getAllResult(name, limit, page);
    }

}
