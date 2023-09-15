import { Body, ConsoleLogger, Controller, Get, Inject, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { Sanitize } from 'common/utils/sanitize';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';

class Test {
  @Expose() test:any;
  @Expose() zz:any;
}

@Controller('user')
export class UserController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger : WinstonLogger,
  ) {
    
  }
  @Get('all')
  getAllUser() {
    return {
      success: true,
      user: {
        email: 'test@test.com',
      },
    };
  }


  @Get('test')
  @UsePipes(new Sanitize(Test))
  test (@Body() data: string, @Req() req : Request ) {
    return req.query
  }
}

