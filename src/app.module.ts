import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './common/utils/db.options';
import { FileModule } from './file/file.module';
import { FlightModule } from 'domain/flight/flight.module';
import { LoginModule } from './login/login.module';
import { UserController } from './user/user.controller';
import { NoticeModule } from 'domain/notice/notice.module';
import { FixPointModule } from 'domain/fix-point/fix-point.module';
import { SectorModule } from 'domain/sector/sector.module';
import { AreaModule } from 'domain/area/area.module';
import { RouteModule } from './domain/route/route.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  FlightModule, FileModule, DBModule, LoginModule, NoticeModule, FixPointModule, SectorModule, AreaModule, RouteModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule { }
 