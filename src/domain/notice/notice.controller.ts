import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'common/auth/role.decorator';
import { RolesGuard } from 'common/auth/role.guard';
import { InsertNoticeDto } from 'common/dto/notice/notice.insert.dto';
import { UpdateNoticeDto } from 'common/dto/notice/notice.update.dto';
import { Notice } from 'entities/notice.entity';
import { Request } from 'express';
import { NoticeService } from './notice.service';

@Controller('notice')
@ApiTags('공지사항 API')
export class NoticeController {
    private readonly log = new Logger(NoticeService.name);

    constructor(
        private readonly noticeService: NoticeService
    ) { }

    @Get()
    @ApiOperation({ description: '공지사항 조회, 페이지 기능 있음', summary: '공지사항 조회' })
    @ApiOkResponse({
        type: [Notice],
        description: '공지사항 조회 성공'
    })
    getAllNotice(@Query('limit') limit?: number, @Query('skip') skip?: number) {
        this.log.log(`get notice`)
        try {
            return this.noticeService.getNotice(limit ? limit : 0, skip ? skip : 0);
        } catch (e) {
            console.error(e);
        }
    }

    @Post()
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({ description: '공지사항 추가', summary: '공지사항 추가' })
    @ApiOkResponse({
        type: Number,
        description: '공지사항 추가 성공'
    })
    addNotice(@Body() body: InsertNoticeDto) {
        this.log.log(`add notice : ${body.title}`)

        try {
            return this.noticeService.addNotice(body);
        } catch (e) {
            console.error(e);
        }
    }

    @Patch(':id')
    @Roles(2)
    @UseGuards(RolesGuard)
    @ApiOperation({ description: '공지사항 수정, body 요소는 전부 선택요소임', summary: '공지사항 수정' })
    @ApiOkResponse({
        type: Number,
        description: '공지사항 수정 성공'
    })
    @ApiNotFoundResponse({
        description: '공지사항 수정 실패. 해당 ID 존재하지 않음.'
    })
    updateNotice(@Param('id') id: number, @Body() body: UpdateNoticeDto, @Req() req: Request) {
        this.log.log(`update notice id : ${id}`)
        try {
            return this.noticeService.updateNotice(id, {...body, user:req.cookies['userid']});
        } catch (e) {
            console.error(e)
        }
    }

    @Delete(':id')
    @Roles(3)
    @UseGuards(RolesGuard)
    @ApiOperation({ description: '공지사항 삭제', summary: '공지사항 삭제' })
    @ApiOkResponse({
        type: Number,
        description: '공지사항 수정 성공'
    })
    @ApiNotFoundResponse({
        description: '공지사항 삭제 실패. 해당 ID 존재하지 않음.'
    })
    deleteNotice(@Param('id') id: number) {
        this.log.log(`delete notice id : ${id}`)

        try {
            return this.noticeService.deleteNotice(id)
        } catch (e) {
            console.error(e)
        }
    }
}
