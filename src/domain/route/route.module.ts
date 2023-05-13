import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteList } from 'entities/route-list.entity';
import { Route } from 'entities/route.entity';
import { RouteListService } from './route-list.service';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';

@Module({
    imports:[TypeOrmModule.forFeature([Route, RouteList])],
    controllers: [RouteController],
    providers: [RouteService, RouteListService]
})
export class RouteModule {}
