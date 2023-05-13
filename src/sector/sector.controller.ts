import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InsertSectorDto } from 'common/dto/sector/sector.insert.dto';
import { UpdateSectorDto } from 'common/dto/sector/sector.update.dto';
import { SectorService } from './sector.service';

@Controller('sector')
export class SectorController {
    constructor(private readonly sectorService: SectorService) { }

    // @Get('area')
    // getArea(){

    // }

    @Get(':id')
    getSingleSector(@Param('id') id: number) {
        return this.sectorService.getSingleSector(id);
    }

    @Get()
    getEntireSector() {
        return this.sectorService.getEntireSector();
    }

    @Post()
    createSector(@Body() body: InsertSectorDto) {
        body.sectorData.push(body.sectorData[0]);
        return this.sectorService.createSector(body);
    }

    @Patch(':id')
    updateSector(@Param('id') id: number, @Body() body: UpdateSectorDto) {
        if (JSON.stringify(body.sectorData[0]) !== JSON.stringify(body.sectorData.at(-1)))
            body.sectorData.push(body.sectorData[0]);
        return this.sectorService.updateSector(id, body);
    }

    @Delete(':id')
    deleteSector(@Param('id') id: number) {
        return this.sectorService.deleteSector(id);
    }
}
