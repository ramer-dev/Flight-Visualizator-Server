import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FixPoint } from 'entities/fix-point.entity';
import { FixPointController } from './fix-point.controller';
import { FixPointService } from './fix-point.service';

@Module({
    imports:[TypeOrmModule.forFeature([FixPoint])],
    controllers: [FixPointController],
    providers: [FixPointService]
})
export class FixPointModule {}
