import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from 'entities/area.entity';
import { Sector } from 'entities/sector.entity';
import { SectorController } from './sector.controller';
import { SectorService } from './sector.service';

@Module({
    imports: [TypeOrmModule.forFeature([Sector, Area])],
    controllers: [SectorController],
    providers:[SectorService]
})
export class SectorModule { }
