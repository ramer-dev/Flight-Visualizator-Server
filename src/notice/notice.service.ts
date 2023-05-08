import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from 'entities/notice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {
    private readonly log = new Logger(NoticeService.name);
    constructor(
        @InjectRepository(Notice)
        private readonly noticeRepository: Repository<Notice>
    ) {

    }
    async getNotice(limit?: number, page?: number) {
        return this.noticeRepository.find({skip:page, take:limit});
    }

    // async updateNotice(id:number, b)
}
