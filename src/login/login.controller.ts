import { Controller, Post, Body, Res } from '@nestjs/common';
import { Get, Inject, Req, UseGuards } from '@nestjs/common/decorators';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LoginService } from './login.service';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { Logger } from 'winston';
import { printWinstonLog } from 'logger/logger.factory';
import { INQUIRER } from '@nestjs/core';
import { Roles } from 'common/auth/role.decorator';
import { RolesGuard } from 'common/auth/role.guard';

@ApiTags('로그인 API')
@Controller('auth')
export class LoginController {
    constructor(private readonly loginService: LoginService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }
    @Post('login')
    @ApiOperation({ summary: "로그인", description: "로그인" })
    @ApiOkResponse({ type: Number, description: "로그인 성공" })
    @ApiBadRequestResponse({ description: '아이디 비밀번호가 일치하지 않음' })
    async login(@Body('id') id: string, @Body('pw') pw: string, @Req() req: Request, @Res() res: Response) {
        try {
            // this.logger.debug(`${id} : ${req.ip} | tried login`)
            printWinstonLog(this.logger, {
                message: `${id} | tried login`,
                module: 'LOGIN',
                ip: req.ip
            }, 'info')
            const result = await this.loginService.login(id, pw);
            res.setHeader('Authorization', 'Bearer ' + result.token)

            res.cookie('jwt', result.token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 1Day
            })

            res.cookie('userid', id, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 1Day
            })

            printWinstonLog(this.logger, {
                message: `${id} | login succeed`,
                module: 'LOGIN',
                ip: req.ip
            }, 'info')

            return res.send({
                message: 'success',
                role: result.role,
            })
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `${id} | failed login`,
                module: 'LOGIN',
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
            module: 'LOGIN',
            ip: req.ip
        }, 'info')
        res.cookie('jwt', '', {
            maxAge: 0
        })
        return res.send({
            message: 'logout success'
        })
    }
}
