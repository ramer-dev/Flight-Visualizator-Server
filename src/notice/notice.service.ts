import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertNoticeDto } from 'common/dto/notice/notice.insert.dto';
import { UpdateNoticeDto } from 'common/dto/notice/notice.update.dto';
import { Notice } from 'entities/notice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {
    constructor(
        @InjectRepository(Notice)
        private readonly noticeRepository: Repository<Notice>
    ) {

    }
    async getNotice(limit?: number, skip?: number) {
        return this.noticeRepository.find({ skip, take: limit });
    }

    async addNotice(body: InsertNoticeDto) {
        await this.noticeRepository.insert(body)
        return body.id;
    }

    async updateNotice(id: number, body: UpdateNoticeDto) {
        await this.noticeRepository.update(id, body)
        return id;
    }

    async deleteNotice(id:number){
        await this.noticeRepository.softDelete(id);
        return id;
    }

}
