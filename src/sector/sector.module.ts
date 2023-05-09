import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from 'entities/sector.entity';
import { SectorController } from './sector.controller';
import { SectorService } from './sector.service';

@Module({
    imports: [TypeOrmModule.forFeature([Sector])],
    controllers: [SectorController],
    providers:[SectorService]
})
export class SectorModule { }
