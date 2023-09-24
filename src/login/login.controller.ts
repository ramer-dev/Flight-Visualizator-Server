import { Controller, Post, Body, Res } from '@nestjs/common';
import { Get, Inject, Req, UseGuards } from '@nestjs/common/decorators';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LoginService } from './login.service';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { Logger } from 'winston';
import { printWinstonLog } from 'logger/logger.factory';
import { Roles } from 'common/auth/role.decorator';
import { RolesGuard } from 'common/auth/role.guard';
import { SHA256 } from 'crypto-js'
import { ConfigService } from '@nestjs/config';
import { RealIP } from 'nestjs-real-ip';

@ApiTags('로그인 API')
@Controller('auth')
export class LoginController {
    constructor(private readonly loginService: LoginService,
        private readonly config: ConfigService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }
    @Post('login')
    @ApiOperation({ summary: "로그인", description: "로그인" })
    @ApiOkResponse({ type: Number, description: "로그인 성공" })
    @ApiBadRequestResponse({ description: '아이디 비밀번호가 일치하지 않음' })
    async login(@Body('id') id: string, @Body('pw') pw: string, @Req() req: Request, @Res() res: Response) {
        try {
            printWinstonLog(this.logger, {
                message: `id : ${id} | tried login`,
                module: LoginController.name,
                ip: req.ip
            }, 'info')
            const hashedPW : string = pw + this.config.get('SECRET_KEY')
            const result = await this.loginService.login(id, SHA256(hashedPW).toString());
            res.setHeader('Authorization', 'Bearer ' + result.token)

            res.cookie('jwt', result.token, {
                httpOnly: true,
                maxAge: 3 * 60 * 60 * 1000 // 3 hour
            })

            res.cookie('userid', id, {
                httpOnly: true,
                maxAge: 3 * 60 * 60 * 1000 // 1 hour
            })

            printWinstonLog(this.logger, {
                message: `${id} | login succeed`,
                module: LoginController.name,
                ip: req.ip
            }, 'info')

            return res.send({
                message: 'success',
                role: result.role,
            })
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `${id} | failed login`,
                module: LoginController.name,
                ip: req.ip
            }, 'error')
        }
    }

    // @Get('cookies')
    // getCookies(@Req() req: Request, @Res() res: Response): any {
    //     const jwt = req.cookies['jwt'];
    //     console.log(req.signedCookies)
    //     console.log(jwt)
    //     return res.send(jwt);
    // }
    @Roles(1)
    @UseGuards(RolesGuard)
    @Post('logout')
    logout(@Res() res: Response, @Req() req: Request) {
        printWinstonLog(this.logger, {
            message: `user logout`,
            module: LoginController.name,
            ip: req.ip
        }, 'info')
        res.cookie('jwt', '', {
            maxAge: 0,
        })

        res.cookie('userid', '', {
            maxAge: 0,
        })
        return res.send({
            message: 'logout success'
        })
    }

    @Get('register')
    register(@RealIP() ip: string, @Body('id') id: string, @Body('pw') pw : string){
        
        
        console.log(ip)
        return ip
    }
}
