import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ApiNotFoundResponse } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { SearchDto } from "common/types/search.type";
import { FlightList } from "entities/flightList.entity";
import { FlightResult } from "entities/flightResult.entity";
import { Between, Equal, JoinTable, Repository, Like } from "typeorm";

@Injectable()
export class ResultService {

    constructor(
        @InjectRepository(FlightResult)
        private readonly resultRepository: Repository<FlightResult>,
        @InjectRepository(FlightList)
        private readonly listRepository: Repository<FlightList>
    ) { }

    async getAllResult(take: number, skip: number): Promise<FlightResult[]> {
        const log = new Logger('FlightResult');
        const res = await this.resultRepository.find({ skip, take })
        log.log(`get every data of flight result ${res.length}EA`)

        return res;
    }

    async getSpecificResult(id: string, take: number, skip: number): Promise<FlightList> {
        const log = new Logger('FlightList');

        const list = await this.listRepository.findOne({ where: { testName: id } })
        if (!list) throw new NotFoundException();
        const result = await this.resultRepository.find({ where: { testName: id }, skip, take })

        list.data = result;

        log.log(`get specific data of:${id} : ${result.length}EA`)
        return list;
    }

    async getSearchResult(body: SearchDto) {
        const { siteName, frequency, startDate, endDate, testName, score, angleStart, angleEnd, distanceStart, distanceEnd, heightStart, heightEnd } = body;

        const where: any = {};

        if (testName) {
            where.testName = Like('%' + testName + '%');
        }

        if (frequency) {
            where.frequency = Like('%' + frequency + '%');
        }

        if (siteName) {
            where.siteName = Like('%' + siteName + '%');
        }

        if (distanceStart && distanceEnd) {
            where.distance = Between(distanceStart, distanceEnd);
        }

        if (angleStart && angleEnd) {
            where.angle = Between(angleStart, angleEnd);
        }

        if (heightStart && heightEnd) {
            where.height = Between(heightStart, heightEnd);
        }

        // if (score) {
        //     // where.txmain = Equal(() => `CAST(LEFT(txmain, 1) AS INTEGER) + CAST(RIGHT(txmain,1) AS INTEGER) >= ${score}`)
        //     where.txmain = (qb) => {
        //         qb.where(`CAST(SUBSTRING_INDEX(txmain, '/', 1) AS UNSIGNED) + CAST(SUBSTRING_INDEX(txmain, '/', -1) AS UNSIGNED) >= :score`, { score });
        //     }
        // }


        console.log(where);
        const res = await this.resultRepository.find({ where});


        const res2 = await this.resultRepository.createQueryBuilder('flight_result').getOne()
        // .innerJoin('flight_result.test_name', 'flight_list')
        // .getMany()

        console.log(res2);

    }
}