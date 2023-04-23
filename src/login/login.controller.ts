import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) { }
    @Post()
    login(@Body('id') id: string, @Body('pw') pw: string) {
        return this.loginService.login(id, pw);
    }
}
