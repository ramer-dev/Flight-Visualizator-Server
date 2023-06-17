import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Frequency } from 'entities/frequency.entity';
import { MapController } from './map.controller';

@Module({
  controllers: [MapController],
})
export class MapModule {}
