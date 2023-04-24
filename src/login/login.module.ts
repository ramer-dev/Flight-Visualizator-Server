import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'entities/account.entity';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from 'common/auth/jwt.strategy';

@Module({
  imports: [
  
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy]
})
export class LoginModule { }
