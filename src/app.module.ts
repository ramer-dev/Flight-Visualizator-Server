import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/account.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './common/utils/db.options';
import { FileModule } from './file/file.module';
import { FlightModule } from './flight/flight.module';
import { LoginModule } from './login/login.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature(
    [User]
  ),
  PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  JwtModule.register({
    secret: 'c0mtr2',
    signOptions: { expiresIn: '1y' }
  }), 
  
  FlightModule, FileModule, DBModule, LoginModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule { }
