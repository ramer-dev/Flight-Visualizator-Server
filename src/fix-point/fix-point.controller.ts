import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { InsertFixPointDto } from "common/dto/fix-point/fix-point.insert.dto";
import { UpdateFixPointDto } from "common/dto/fix-point/fix-point.update.dto";
import { FixPointService } from "./fix-point.service";

@Controller('point')
@ApiTags('픽스점 API')
export class FixPointController {
    constructor(private readonly fixPointService: FixPointService) { }

    @Get(':id')
    @ApiOperation({summary:'단일 픽스점 리턴', description: '픽스점 id 또는 이름을 입력하면 해당 픽스점의 정보를 반환한다.'})
    @ApiOkResponse({description:'픽스점 리턴 성공'})
    @ApiInternalServerErrorResponse({description:'서버 에러이거나 검색한 쿼리에 따른 값이 존재하지 않음.'})
    getSingleFixPoint(@Param('id') id: number) {
        return this.fixPointService.getSingleFixPoint(id);
    }

    @Get()
    @ApiOperation({summary:'전체 픽스점 리턴', description: '전체 픽스점의 정보를 반환한다.'})
    @ApiOkResponse({description:'전체 픽스점의 정보를 리턴한다.'})
    getEntireFixPoint() {
        return this.fixPointService.getEntireFixPoint();
    }


    @Post()
    @ApiOperation({summary:'픽스점 생성', description:'body로 입력해준 정보대로 픽스점을 생성한다.'})
    @ApiOkResponse({description:'픽스점 생성 성공'})
    @ApiBadRequestResponse({description:'픽스점 생성 실패. body 입력 정보를 확인해주세요.'})
    @ApiInternalServerErrorResponse({description : '서버 에러이거나 이미 등록된 픽스점일 수 있음.'})
    createFixPoint(@Body() body: InsertFixPointDto) {
        return this.fixPointService.createFixPoint(body);
    }

    @Patch(':id')
    @ApiOperation({summary:'픽스점 수정', description:'body로 입력해준 정보대로 픽스점을 수정한다.'})
    @ApiOkResponse({description:'픽스점 수정 성공'})
    @ApiBadRequestResponse({description:'픽스점 수정 실패. body 입력 정보를 확인해주세요.'})
    updateFixPoint(@Param('id') id: number, @Body() body: UpdateFixPointDto) {
        return this.fixPointService.updateFixPoint(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary:'픽스점 삭제', description:'입력한 id의 픽스점을 삭제한다.'})
    @ApiOkResponse({description:'픽스점 삭제 성공'})
    deleteFixPoint(@Param('id') id: number) {
        return this.fixPointService.deleteFixPoint(id);
    }
}