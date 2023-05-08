import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertNoticeDto } from 'common/dto/notice/notice.insert.dto';
import { UpdateNoticeDto } from 'common/dto/notice/notice.update.dto';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
    constructor(
        private readonly noticeService: NoticeService
    ) { }

    @Get()
    getAllNotice(@Query('limit') limit?: number, @Query('page') page?: number) {
        try {
            return this.noticeService.getNotice(limit ? limit : 0, page ? page : 0);
        } catch (e) {
            console.error(e);
        }
    }

    @Post()
    addNotice(@Body() body: InsertNoticeDto) {
        try {
            return this.noticeService.addNotice(body);
        } catch (e) {
            console.error(e);
        }
    }

    @Patch(':id')
    updateNotice(@Param('id') id: number, @Body() body: UpdateNoticeDto) {
        try {
            return this.noticeService.updateNotice(id, body);
        } catch (e) {
            console.error(e)
        }
    }

    @Delete(':id')
    deleteNotice(@Param('id') id : number){
        try{
            return this.noticeService.deleteNotice(id)
        } catch (e){
            console.error(e)
        }
    }
}
