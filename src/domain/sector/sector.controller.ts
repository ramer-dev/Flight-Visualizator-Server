import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InsertSectorDto } from 'common/dto/sector/sector.insert.dto';
import { UpdateSectorDto } from 'common/dto/sector/sector.update.dto';
import { Sector } from 'entities/sector.entity';
import { AreaService } from '../area/area.service';
import { SectorService } from './sector.service';

@ApiTags('섹터 API')
@Controller('sector')
export class SectorController {
    constructor(private readonly sectorService: SectorService) { }

    // @Get('area')
    // getArea(){
    //     return this.areaService.getEntireArea();
    // }

    @Get(':id')
    @ApiOperation({summary:"섹터 조회", description:"섹터 조회"})
    @ApiNotFoundResponse({description:'id가 존재하지 않음'})
    @ApiOkResponse({type:[Sector], description:'섹터 조회 성공'})
    getSingleSector(@Param('id') id: number) {
        return this.sectorService.getSingleSector(id);
    }

    @Get()
    @ApiOperation({summary:"섹터 전체 조회", description:"섹터 전체 조회"})
    @ApiOkResponse({type:[Sector], description:'섹터 전체 조회 성공'})
    getEntireSector() {
        return this.sectorService.getEntireSector();
    }

    @Post()
    @ApiOperation({summary:"섹터 추가", description:"섹터 추가"})
    @ApiOkResponse({type:[Sector], description:"섹터 추가 성공"})
    @ApiBadRequestResponse({description:'body 형식이 올바르지 않음'})
    createSector(@Body() body: InsertSectorDto) {
        body.sectorData.push(body.sectorData[0]);
        return this.sectorService.createSector(body);
    }

    @Patch(':id')
    @ApiOperation({summary:"섹터 수정", description:"섹터 수정"})
    @ApiOkResponse({type:Number, description:"섹터 수정 성공"})
    @ApiNotFoundResponse({description:'id가 존재하지 않음'})
    @ApiBadRequestResponse({description:'body 형식이 올바르지 않음'})
    updateSector(@Param('id') id: number, @Body() body: UpdateSectorDto) {
        if (JSON.stringify(body.sectorData[0]) !== JSON.stringify(body.sectorData.at(-1)))
            body.sectorData.push(body.sectorData[0]);
        return this.sectorService.updateSector(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary:"섹터 삭제", description:"섹터 삭제"})
    @ApiOkResponse({type:Number, description:"섹터 삭제 성공"})
    @ApiNotFoundResponse({description:'id가 존재하지 않음'})
    deleteSector(@Param('id') id: number) {
        return this.sectorService.deleteSector(id);
    }
}
