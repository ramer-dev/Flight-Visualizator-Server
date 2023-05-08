import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
    constructor(
        private readonly noticeService: NoticeService
    ) { }

    @Get()
    getAllNotice() {
        try {
            return this.noticeService.getNotice();
        } catch (e) {
            throw new e;
        }
    }

    @Get(':limit/:page')
    getNotice(@Param('limit') limit: number, @Param('page') page: number) {
        try {
            return this.noticeService.getNotice(limit, page);
        } catch (e) {
            throw new e;
        }
    }

}
