import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { TypeOrmConfigService } from './common/utils/db.options';
import { FileModule } from './file/file.module';
import { FlightModule } from 'domain/flight/flight.module';
import { LoginModule } from './login/login.module';
import { NoticeModule } from 'domain/notice/notice.module';
import { FixPointModule } from 'domain/fix-point/fix-point.module';
import { SectorModule } from 'domain/sector/sector.module';
import { AreaModule } from 'domain/area/area.module';
import { RouteModule } from 'domain/route/route.module';
import { FrequencyModule } from 'domain/frequency/frequency.module';
import { SiteModule } from 'domain/site/site.module';
import { MapModule } from 'domain/map/map.module';
import { LoggerModule } from 'logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({ isGlobal:true, envFilePath: `.development.env` }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject:[LoginModule]
    }),
    FlightModule,
    FileModule,
    LoginModule,
    NoticeModule,
    FixPointModule,
    SectorModule,
    AreaModule,
    RouteModule,
    FrequencyModule,
    SiteModule,
    MapModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
