import { Injectable, Logger } from '@nestjs/common';
import { FlightList } from 'entities/list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(FlightList)
        private readonly listRepository: Repository<FlightList>,
    ) { }

    async getAllList(): Promise<FlightList[]> {
        const log = new Logger('List');
        const res = await this.listRepository.find();
        return res;
    }

    async getListItem(id:string): Promise<FlightList> {
        const res = await this.listRepository.findOne({where:{TestName:id}})
        return res;
    }
}
