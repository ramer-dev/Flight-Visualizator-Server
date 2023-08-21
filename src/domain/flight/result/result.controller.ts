import { Body, Controller, Get, Param, Post, Patch, UseGuards, Delete, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "common/auth/role.decorator";
import { RolesGuard } from "common/auth/role.guard";
import { InsertFlightResultDto } from "common/dto/flight-result/flight-result.insert.dto";
import { UpdateFlightResultDto } from "common/dto/flight-result/flight-result.update.dto";
import { FlightResultFormDto } from "common/dto/flight-result.form.dto";
import { SearchDto } from "common/dto/search.dto";
import { FlightResult } from "entities/flight-result.entity";
import { ResultService } from "./result.service";
import { PointType } from "common/dto/coordinate.types";


@Controller('flight/result')
@ApiTags('비행검사 결과 API')
export class ResultController {
    constructor(private readonly resultService: ResultService) { }

    @Get()
    @ApiOperation({summary:"비행검사 결과 전체 조회", description:"비행검사 결과 전체 조회, 페이징 기능 있음"})
    @ApiOkResponse({type:[FlightResult], description:'비행검사 결과 전체 조회 성공'})
    getFlightResultAll(/*@Query('skip') skip: number,*/ @Query('take') take: number) {
        return this.resultService.getAllResult(+take);
    }

    @Get('search')
    @ApiOperation({summary:"비행검사 결과 검색", description:"비행검사 결과 검색"})
    @ApiOkResponse({type:[FlightResult], description:"비행검사 결과 검색 성공"})
    @ApiBadRequestResponse({description:'body 형식이 올바르지 않음'})
    getSearchResult(@Body() body: SearchDto) {
        return this.resultService.getSearchResult(body);
    }

    @Post('nearby')
    @ApiOperation({summary:"비행검사 좌표 분석", description:"비행검사 결과 삭제"})
    @ApiOkResponse({type:Number, description:"비행검사 결과 삭제 성공"})
    @ApiNotFoundResponse({description:'id가 존재하지 않음'})
    findPointsWithinRadius(@Body('point') point: PointType, @Body('distance') distance: number) {
        return this.resultService.findPointsWithinRadius(point, distance);
    }

    @Get(':id')
    @ApiOperation({summary:"비행검사 결과 단일 조회", description:"비행검사 testID에 해당하는 결과 조회"})
    @ApiOkResponse({type:FlightResult, description:"비행검사 결과 단일 조회 성공"})
    @ApiBadRequestResponse({description:'body 형식이 올바르지 않음'})
    @ApiNotFoundResponse({description:"ID를 찾을 수 없음"})
    getSpecificResult(@Param('id') id: number, @Body('limit') limit: number, @Body('page') page: number) {
        return this.resultService.getSpecificResult(id);
    }


    @Post()
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({summary:"비행검사 결과 추가", description:"비행검사 결과 추가"})
    @ApiOkResponse({type:Number, description:"비행검사 결과 추가 성공"})
    @ApiBadRequestResponse({description:'body 형식이 올바르지 않음'})
    @ApiBody({type:[InsertFlightResultDto]})
    AddFlightResult(@Body() body: InsertFlightResultDto[]) {
        return this.resultService.addFlightResult(body);
    }

    @Patch()
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({summary:"비행검사 결과 수정", description:"비행검사 결과 수정"})
    @ApiOkResponse({type:Number, description:"비행검사 결과 수정 성공"})
    @ApiBadRequestResponse({description:'body 형식이 올바르지 않음'})
    UpdateFlightResult(@Body() body: UpdateFlightResultDto[]) {
        return this.resultService.updateFlightResult(body);
    }

    @Patch(':id')
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({summary:"비행검사 결과 수정", description:"비행검사 결과 수정"})
    @ApiOkResponse({type:Number, description:"비행검사 결과 수정 성공"})
    @ApiBadRequestResponse({description:'body 형식이 올바르지 않음'})
    UpdateCoordData(@Body() body: UpdateFlightResultDto, @Param('id') id:number) {
        return this.resultService.updateCoordData(body, id);
    }

    @Delete()
    @Roles(3)
    @UseGuards(RolesGuard)
    @ApiOperation({summary:"비행검사 결과 삭제", description:"비행검사 결과 삭제"})
    @ApiOkResponse({type:Number, description:"비행검사 결과 삭제 성공"})
    @ApiNotFoundResponse({description:'id가 존재하지 않음'})
    // @Roles(1)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    DeleteFlightResult(@Body('id') id : number[]) {
        return this.resultService.deleteFlightResult(id)
    }

}
