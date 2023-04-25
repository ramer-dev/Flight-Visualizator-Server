import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'entities/user.entity';
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from 'auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'c0mtr2',
      signOptions: { expiresIn: 1800 }
    }),
  ],

  controllers: [LoginController],
  providers: [LoginService, JwtStrategy]
})
export class LoginModule { }
