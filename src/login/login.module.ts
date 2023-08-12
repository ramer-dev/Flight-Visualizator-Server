import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'entities/user.entity';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from 'common/auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User]),
    // JwtModule.register({
    //   secret: process.env.SECRET_KEY,
    //   signOptions: { expiresIn: 3 * 60 * 60 }
    // }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        defaultStrategy: 'jwt',
        property: 'user',
        secret: configService.get<string>('SECRET_KEY')
      }),
      inject: [ConfigService]
    }),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],


  controllers: [LoginController],
  providers: [LoginService, JwtStrategy]
})
export class LoginModule { }
