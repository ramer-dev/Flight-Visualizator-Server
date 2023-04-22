import { Injectable, Logger } from '@nestjs/common';
import { List } from './list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(List)
        private readonly listRepository: Repository<List>,
    ) { }

    async getAllList(): Promise<List[]> {
        const log = new Logger('List');
        const q = await this.listRepository.createQueryBuilder('flight_test_list')
        const sql = q.getQueryAndParameters();
        console.log(sql);
        const res = await this.listRepository.find();
        return res;
    }
}
