import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flight/flight.module';
import { FileModule } from './file/file.module'; 

@Module({
  imports: [FlightModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
