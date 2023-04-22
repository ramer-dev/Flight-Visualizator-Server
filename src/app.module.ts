import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './common/utils/db.options';
import { FileModule } from './file/file.module';
import { FlightModule } from './flight/flight.module';

@Module({
  imports: [FlightModule, FileModule, DBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
