import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'entities/user.entity';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from 'common/auth/jwt.strategy';

@Module({
  imports: [
  TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'c0mtr2',
      signOptions: { expiresIn: 3*60*60 }
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy]
})
export class LoginModule { }
