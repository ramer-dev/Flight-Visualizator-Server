import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FlightList } from "entities/flightList.entity";
import { FlightResult } from "entities/flightResult.entity";
import { JoinTable, Repository } from "typeorm";

@Injectable()
export class ResultService {

    constructor(
        @InjectRepository(FlightResult)
        private readonly resultRepository: Repository<FlightResult>,
        @InjectRepository(FlightList)
        private readonly listRepository: Repository<FlightList>
    ) { }

    async getAllResult(testname: string, take: number, skip:number) {
        // const log = new Logger('FlightResult');
        return 'test'
        // const res = this.listRepository.createQueryBuilder('flight_list').innerJoin()
        // return res;
    }

}