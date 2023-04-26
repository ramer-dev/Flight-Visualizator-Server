import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'common/auth/jwt.guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllUser() {
    return {
      success: true,
      user: {
        email: 'test@test.com',
      },
    };
  }
}