import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "common/auth/jwt.guard";
import { Roles } from "common/auth/role.decorator";
import { RolesGuard } from "common/auth/role.guard";
import { InsertFlightListDto } from "common/dto/flightList/flightList.insert.dto";
import { UpdateFlightListDto } from "common/dto/flightList/flightList.update.dto";
import { FlightResultFormDto } from "common/dto/flightResultForm.dto";
import { ResultService } from "flight/result/result.service";
import { ListService } from "./list.service";

@Controller('flight/list')
@ApiTags('비행검사 전체 목록 조회')
export class ListController {
    constructor(private readonly listService: ListService,
        private readonly resultService: ResultService) {
    }

    @Get()
    // @Roles(1)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: '전체 목록 조회', description: '전체 목록 조회' })
    getAllList() {
        return this.listService.getAllList();
    }

    @Get(':id')
    @ApiOperation({ summary: '비행검사 단일 조회', description: '비행검사 단일 항목 조회' })
    getOneItem(@Param('id') id : number) {
        return this.listService.getOneItem(id);
    }

    @Post()
    @ApiOperation({ summary: '비행 검사 추가', description: ' 비행 검사 결과 추가' })
    async addFlightList(@Body() body: FlightResultFormDto) {
        const id = await this.listService.addFlightList(body);
        
        body.data = body.data.map(t => { if (id) { t.testId = id; } return t });

        return await this.resultService.addFlightResult(body.data);
    }

    @Patch(':id')
    @ApiOperation({summary:'비행검사 수정', description:'비행검사 명칭 및 타입 등 수정할 때 사용'})
    updateFlightList(@Param('id') id : number, @Body() body : UpdateFlightListDto){
        return this.listService.updateFlightList(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary:'비행검사 삭제', description:'비행검사 항목 삭제할 때 사용'})
    deleteFlightList(@Param('id') id: number){
        return this.listService.deleteFlightList(id);
    }

}