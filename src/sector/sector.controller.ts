import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InsertSectorDto } from 'common/dto/sector/sector.insert.dto';
import { SectorService } from './sector.service';

@Controller('sector')
export class SectorController {
    constructor(private readonly sectorService: SectorService) { }

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
        return this.sectorService.createSector(body);
    }
}
