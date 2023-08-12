import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
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