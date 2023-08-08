import { Controller, Post, Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginService } from './login.service';

@ApiTags('로그인 API')
@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) { }
    @Post()
    @ApiOperation({ summary: "로그인", description: "로그인" })
    @ApiOkResponse({ type: Number, description: "로그인 성공" })
    @ApiBadRequestResponse({ description: '아이디 비밀번호가 일치하지 않음' })
    login(@Body('id') id: string, @Body('pw') pw: string) {
        return this.loginService.login(id, pw);
    }
}
