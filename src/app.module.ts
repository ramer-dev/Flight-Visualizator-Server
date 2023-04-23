import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './common/utils/db.options';
import { FileModule } from './file/file.module';
import { FlightModule } from './flight/flight.module';
import { LoginModule } from './login/login.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [FlightModule, FileModule, DBModule, LoginModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule { }
