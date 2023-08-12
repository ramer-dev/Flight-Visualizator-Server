import { Controller, Post, Body, Res } from '@nestjs/common';
import { Get, Req } from '@nestjs/common/decorators';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LoginService } from './login.service';

@ApiTags('로그인 API')
@Controller('auth')
export class LoginController {
    constructor(private readonly loginService: LoginService) { }
    @Post('login')
    @ApiOperation({ summary: "로그인", description: "로그인" })
    @ApiOkResponse({ type: Number, description: "로그인 성공" })
    @ApiBadRequestResponse({ description: '아이디 비밀번호가 일치하지 않음' })
    async login(@Body('id') id: string, @Body('pw') pw: string, @Res() res: Response) {
        const result = await this.loginService.login(id, pw);
        res.setHeader('Authorization', 'Bearer '+ result.token)
            
        res.cookie('jwt', result.token, {
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000 // 1Day
        })

        res.cookie('userid', id, {
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000 // 1Day
        })
        return res.send({
            message: 'success',
            role:result.role,
        }) 
    }

    @Get('cookies')
    getCookies(@Req() req: Request, @Res() res: Response) : any {
        const jwt = req.cookies['jwt'];
        console.log(req.signedCookies)
        console.log(jwt)
        return res.send(jwt);
    }

    @Post('logout')
    logout(@Res() res: Response) {
        res.cookie('jwt', '', {
            maxAge:0
        })
        console.log('logout)')
        return res.send({
            message: 'logout success'
        })
    }
}
