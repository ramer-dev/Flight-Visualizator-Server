import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './common/utils/db.options';
import { FileModule } from './file/file.module';
import { FlightModule } from './flight/flight.module';
import { LoginModule } from './login/login.module';
import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
@Module({
  imports: [TypeOrmModule.forFeature(
    [User]
  ),
  ConfigModule.forRoot({
    validationSchema: Joi.object({
      JWT_ACCESS_TOKEN_SECRET:Joi.string().required(),
      JWT_ACCESS_TOKEN_EXPIRATION_TIME:Joi.string().required(),
      JWT_REFRESH_TOKEN_SECRET:Joi.string().required(),
      JWT_REFRESH_TOKEN_EXPRIATION_TIME:Joi.string().required(),
    })
  }),
  PassportModule.register({ defaultStrategy: 'jwt', session: false }),


    FlightModule, FileModule, DBModule, LoginModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule { }
