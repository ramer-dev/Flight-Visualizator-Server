import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Account } from 'entities/account.entity';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from 'common/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Account]
    ),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'c0mtr2',
      signOptions: { expiresIn: '1y' }
    })

  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy]
})
export class LoginModule { }
