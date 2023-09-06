import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from 'entities/area.entity';
import { FixPoint } from 'entities/fix-point.entity';
import { Sector } from 'entities/sector.entity';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';


@Module({
    imports:[TypeOrmModule.forFeature([Area, Sector])],
    controllers: [AreaController],
    providers: [AreaService]
})
export class AreaModule {}
