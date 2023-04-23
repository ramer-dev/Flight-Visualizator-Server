import { Injectable, Logger } from '@nestjs/common';
import { FlightTestList } from 'entities/list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(FlightTestList)
        private readonly listRepository: Repository<FlightTestList>,
    ) { }

    async getAllList(): Promise<FlightTestList[]> {
        const log = new Logger('List');
        const q = await this.listRepository.createQueryBuilder('flight_test_list')
        const sql = q.getQueryAndParameters();
        console.log(sql);
        const res = await this.listRepository.find();
        return res;
    }
}
