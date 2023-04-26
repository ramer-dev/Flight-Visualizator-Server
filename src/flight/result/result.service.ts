import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FlightList } from "entities/list.entity";
import { FlightResult } from "entities/result.entity";
import { JoinTable, Repository } from "typeorm";

@Injectable()
export class ResultService {

    constructor(
        @InjectRepository(FlightResult)
        private readonly resultRepository: Repository<FlightResult>,
        @InjectRepository(FlightList)
        private readonly listRepository: Repository<FlightList>
    ) { }

    async getAllResult(testname: string, take: number, skip:number): Promise<FlightList> {
        const log = new Logger('FlightResult');
        const res = this.listRepository.createQueryBuilder('flight_list').innerJoin()
        return res;
    }

}