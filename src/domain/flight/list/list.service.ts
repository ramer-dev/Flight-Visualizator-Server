import { Injectable, Logger } from '@nestjs/common';
import { FlightList } from 'entities/flight-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlightResult } from 'entities/flight-result.entity';
import { FlightResultFormDto } from 'common/dto/flight-result.form.dto';
import { InsertFlightListDto } from 'common/dto/flight-list/flight-list.insert.dto';
import { UpdateFlightListDto } from 'common/dto/flight-list/flight-list.update.dto';

@Injectable()
export class ListService {
    private readonly log = new Logger(ListService.name)
    constructor(
        @InjectRepository(FlightList)
        private readonly listRepository: Repository<FlightList>,
        @InjectRepository(FlightResult)
        private readonly resultRepository: Repository<FlightResult>,
    ) { }

    async getAllList(): Promise<FlightList[]> {
        const res = await this.listRepository.find({order:{id:'desc'}});
        this.log.log(`get all Lists: length:${res.length}`)
        return res;
    }

    async getOneItem(id: number): Promise<FlightList> {

        const list = await this.listRepository.findOne({ where: { id } })
        const result = await this.resultRepository.find({ where: { testId: id } })

        list.data = result;

        this.log.log(`get one flight Lists: name:${id}`)
        return list;
    }

    async addFlightList(body: FlightResultFormDto): Promise<number> {
        const flightList: InsertFlightListDto = body;
        const listRes = await this.listRepository.insert(flightList)

        this.log.log(`add flight List. affected rows:${body.data.length}`)

        return listRes.identifiers[0].id;
    }

    async updateFlightList(id: number, body: UpdateFlightListDto): Promise<number> {
        await this.listRepository.update(id, body)
        this.log.log(`update flight list. id:${id}`)
        return id;
    }

    async deleteFlightList(id: number): Promise<number> {
        await this.listRepository.softDelete(id);
        await this.resultRepository.softDelete({ testId: id })
        this.log.log(`update flight list. id:${id}`)
        return id;
    }
}
