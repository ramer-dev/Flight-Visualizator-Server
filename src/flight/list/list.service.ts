import { Injectable, Logger } from '@nestjs/common';
import { FlightList } from 'entities/flightList.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlightResult } from 'entities/flightResult.entity';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(FlightList)
        private readonly listRepository: Repository<FlightList>,
        @InjectRepository(FlightResult)
        private readonly resultRepository : Repository<FlightResult>
    ) { }

    async getAllList(): Promise<FlightList[]> {
        const log = new Logger('FlightList');
        const res = await this.listRepository.find();
        log.log(`get all Lists: length:${res.length}`)
        return res;
    }

    // async getListItem(id:string): Promise<FlightList> {
    //     const log = new Logger('FlightList');

    //     const list = await this.listRepository.findOne({where:{testName:id}})
    //     const result = await this.resultRepository.find({where:{testName:id}})
        
    //     list.data = result;
        
    //     log.log(`get one flight Lists: name:${id}`)
    //     return list;
    // }
}
