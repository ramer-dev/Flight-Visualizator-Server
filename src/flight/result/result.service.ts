import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ApiNotFoundResponse } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { FlightListDto } from "common/dto/flightList.dto";
import { InsertFlightResultDto } from "common/dto/flightResult.insert.dto";
import { FlightResultFormDto } from "common/dto/flightResultForm.dto";
import { SearchDto } from "common/dto/search.dto";
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

    async getSpecificResult(id: number, take: number, skip: number): Promise<FlightList> {
        const log = new Logger('FlightList');

        const list = await this.listRepository.findOne({ where: { id } })
        if (!list) throw new NotFoundException();
        const result = await this.resultRepository.find({ where: { testId: id }, skip, take })

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
        const res = await this.resultRepository.find({ where });
        const res2 = await this.resultRepository.createQueryBuilder('flight_result').getOne()
        // .innerJoin('flight_result.test_name', 'flight_list')
        // .getMany()


    }

    async addFlightResult(body: FlightResultFormDto) {
        // this.listRepository.save(body.)
        const flightList: FlightListDto = body;
        const listRes = await this.listRepository
            .createQueryBuilder('flight_list')
            .insert()
            .into(FlightList)
            .values(flightList)
            .execute();

        const flightResult: InsertFlightResultDto[] = body.data.map(t => {
            t.testId = listRes.identifiers[0].id;
            return t;
        });

        await this.resultRepository.createQueryBuilder('flight_result')
            .insert()
            .into(FlightResult)
            .values(flightResult)
            .execute();
    }

    async updateFlightResult(id: number, body: InsertFlightResultDto) {
        const board = await this.resultRepository.findOne({ where: { id } })

        try {
            await this.resultRepository.update(id, body)
            const a = await this.resultRepository.findOne({ where: { id } })
            console.log(a);
        } catch (e) {
            console.error(e)
        }
    }

    async deleteFlightResult(id: number[]) {

    }
}