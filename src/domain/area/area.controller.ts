import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { InsertAreaDto } from "common/dto/area/area.insert.dto";
import { UpdateAreaDto } from "common/dto/area/area.update.dto";
import { Area } from "entities/area.entity";
import { AreaService } from "./area.service";

@Controller('area')
@ApiTags('공역 API')
export class AreaController {
    private readonly log = new Logger('AreaController');
    constructor(private readonly areaService: AreaService,
    ) { }


    @Get()
    @ApiOperation({ description: '공역 조회, 페이지 기능 있음', summary: '공역 조회' })
    @ApiOkResponse({
        type: [Area],
        description: '공역 조회 성공'
    })
    getEntireArea(@Query('valid') valid : boolean) {
        this.log.log(`get entire area`)
        try {
            if(valid) return this.areaService.getValidArea(); 
            else return this.areaService.getEntireArea();
        } catch (e) {
            console.error(e);
        }
    }

    @Post()
    @ApiOperation({ description: '공역 추가', summary: '공역 추가' })
    @ApiOkResponse({
        type: Number,
        description: '공역 추가 성공'
    })
    addArea(@Body() body: InsertAreaDto) {
        this.log.log(`add Area : ${body.areaName}`)

        try {
            return this.areaService.addArea(body);
        } catch (e) {
            console.error(e);
        }
    }

    @Patch(':id')
    @ApiOperation({ description: '공역 수정, body 요소는 전부 선택요소임', summary: '공역 수정' })
    @ApiOkResponse({
        type: Number,
        description: '공역 수정 성공'
    })
    @ApiNotFoundResponse({
        description: '공역 수정 실패. 해당 ID 존재하지 않음.'
    })
    updateArea(@Param('id') id: number, @Body() body: UpdateAreaDto) {
        this.log.log(`update Area id : ${id}`)

        try {
            return this.areaService.updateArea(id, body);
        } catch (e) {
            console.error(e)
        }
    }

    @Delete(':id')
    @ApiOperation({ description: '공역 삭제', summary: '공역 삭제' })
    @ApiOkResponse({
        type: Number,
        description: '공역 수정 성공'
    })
    @ApiNotFoundResponse({
        description: '공역 삭제 실패. 해당 ID 존재하지 않음.'
    })
    deleteArea(@Param('id') id: number) {
        this.log.log(`delete Area id : ${id}`)

        try {
            return this.areaService.deleteArea(id)
        } catch (e) {
            console.error(e)
        }
    }

}
