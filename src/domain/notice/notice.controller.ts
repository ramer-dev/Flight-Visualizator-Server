import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'common/auth/role.decorator';
import { RolesGuard } from 'common/auth/role.guard';
import { InsertNoticeDto } from 'common/dto/notice/notice.insert.dto';
import { UpdateNoticeDto } from 'common/dto/notice/notice.update.dto';
import { Notice } from 'entities/notice.entity';
import { Request } from 'express';
import { printWinstonLog } from 'logger/logger.factory';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { RealIP } from 'nestjs-real-ip';
import { NoticeService } from './notice.service';

@Controller('notice')
@ApiTags('공지사항 API')
export class NoticeController {

    constructor(
        private readonly noticeService: NoticeService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) { }

    @Get()
    @ApiOperation({ description: '공지사항 조회, 페이지 기능 있음', summary: '공지사항 조회' })
    @ApiOkResponse({
        type: [Notice],
        description: '공지사항 조회 성공'
    })
    getAllNotice(@RealIP() ip: string, @Query('limit') limit?: number, @Query('skip') skip?: number) {
        printWinstonLog(this.logger, {
            message: `[GET] Entire Notice`,
            module: NoticeController.name,
            ip: ip
        }, 'info')
        try {
            return this.noticeService.getNotice(limit ? limit : 0, skip ? skip : 0);
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[GET] Failed to Get Entire Notice`,
                module: NoticeController.name,
                ip: ip
            }, 'error')
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
    addNotice(@RealIP() ip: string, @Body() body: InsertNoticeDto, @Req() req: Request) {

        printWinstonLog(this.logger, {
            message: `[POST] Add Notice ${body.title}`,
            module: NoticeController.name,
            ip: ip
        }, 'info')
        try {
            return this.noticeService.addNotice({...body, user:req.cookies['userid']});
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[GET] Failed to Add Notice ${body.title}`,
                module: NoticeController.name,
                ip: ip
            }, 'error')
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
    updateNotice(@Param('id') id: number, @Body() body: UpdateNoticeDto, @RealIP() ip: string, @Req() req: Request) {
        printWinstonLog(this.logger, {
            message: `[PATCH] Update Notice | id : ${id}`,
            module: NoticeController.name,
            ip: ip
        }, 'info')
        try {
            return this.noticeService.updateNotice(id, { ...body, user: req.cookies['userid'] });

        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[PATCH] Failed to Update Notice | id : ${id}`,
                module: NoticeController.name,
                ip: ip
            }, 'error')
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
    deleteNotice(@RealIP() ip: string, @Param('id') id: number) {
        printWinstonLog(this.logger, {
            message: `[DELETE] Notice | id : ${id}`,
            module: NoticeController.name,
            ip: ip
        }, 'info')
        try {
            return this.noticeService.deleteNotice(id)
        } catch (e) {
            printWinstonLog(this.logger, {
                message: `[PATCH] Failed to Delete Notice | id : ${id}`,
                module: NoticeController.name,
                ip: ip
            }, 'error')
        }  
    }
}
