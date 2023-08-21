import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ApiNotFoundResponse } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertFlightResultDto } from "common/dto/flight-result/flight-result.insert.dto";
import { UpdateFlightResultDto } from "common/dto/flight-result/flight-result.update.dto";
import { FlightResultFormDto } from "common/dto/flight-result.form.dto";
import { SearchDto } from "common/dto/search.dto";
import { FlightList } from "entities/flight-list.entity";
import { FlightResult } from "entities/flight-result.entity";
import { Between, Repository, Like, Point } from "typeorm";
import { Page } from "common/class/page.class";
import { PointType } from "common/dto/coordinate.types";

@Injectable()
export class ResultService {
    private readonly log: Logger = new Logger(ResultService.name)
    constructor(
        @InjectRepository(FlightResult)
        private readonly resultRepository: Repository<FlightResult>,
        @InjectRepository(FlightList)
        private readonly listRepository: Repository<FlightList>,
    ) { }

    async getAllResult(/*skip: number,*/ take: number) {
        this.log.log(`get every data of flight result ${take}`)
        const a: FlightList = {
            id: -1,
            testName: "Search",
            testDate: undefined,
            testType: "",
            testRoute: "",
            userId: "",
            updatedAt: undefined,
            deletedAt: undefined,
            data: undefined
        }
        const [result, count] = await this.resultRepository.findAndCount()

        a.data = new Page(count, take, result)

        this.log.log(`get every data of flight result ${result.length}EA  ${take}`)
        return a;
    }

    async getSpecificResult(id: number) {
        const list = await this.listRepository.findOne({ where: { id } })
        if (!list) throw new NotFoundException();

        const [result, count] = await this.resultRepository.findAndCount({ where: { testId: list.id } })
        const page = new Page(count, 100, result);

        list.data = page;
        this.log.log(`get specific data of:${id} : ${list.data.totalCount}EA`)
        // list.data = [result, { count: count }]
        return list
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
        this.log.log(`get search flight data of: ${res.length}EA`)

        // .innerJoin('flight_result.test_name', 'flight_list')
        // .getMany()


    }

    async addFlightResult(body: InsertFlightResultDto[]) {
        await this.resultRepository.insert(body)
        this.log.log(`post flight result rows : ${body.length}`)
    }

    async updateFlightResult(body: UpdateFlightResultDto[]) {
        if (body.length) {
            await this.resultRepository.delete({ testId: body[0].testId })
            await this.resultRepository.insert(body)
        }
        // const a = await this.resultRepository.findOne({ where: { id } })
        // this.log.log(`updated flight result id : ${id}`)

        return body.length;
        // return id;
    }

    async deleteFlightResult(id: number[]) {
        await this.resultRepository.softDelete(id);
        this.log.log(`deleted flight result id : ${id}`)
    }

    async updateCoordData(body: UpdateFlightResultDto, id: number) {
        this.log.log(`updated flight result id : ${id}`)
        this.log.log(body.siteName)
        // this.log.log(`lat ${body?.point?.lat} | lng ${body?.point.lng}`)
        await this.resultRepository.createQueryBuilder().update(FlightResult).set(body).where({ id }).execute();
    }

    async findPointsWithinRadius(point: PointType, radius: number) {
        this.log.log(`updated flight result id : ${point.lat} ${point.lng}, ${radius}`)
        const result = await this.resultRepository.createQueryBuilder().where(`ST_DISTANCE(point, POINT(:lat, :lng)) * 111133 <= :radius * 1000`, { lat: point.lat, lng: point.lng, radius: radius }).getMany()
        return result;
    }
}