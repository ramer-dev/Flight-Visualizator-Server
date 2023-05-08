import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './common/utils/db.options';
import { FileModule } from './file/file.module';
import { FlightModule } from './flight/flight.module';
import { LoginModule } from './login/login.module';
import { UserController } from './user/user.controller';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  FlightModule, FileModule, DBModule, LoginModule, NoticeModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule { }
 