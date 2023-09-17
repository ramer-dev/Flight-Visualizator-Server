import { Injectable, Logger } from '@nestjs/common';
import { FlightList } from 'entities/flight-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlightResult } from 'entities/flight-result.entity';
import { FlightResultAddFormDto, FlightResultUpdateFormDto } from 'common/dto/flight-result.form.dto';
import { InsertFlightListDto } from 'common/dto/flight-list/flight-list.insert.dto';
import { UpdateFlightListDto } from 'common/dto/flight-list/flight-list.update.dto';
import { Page } from 'common/class/page.class';

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
        const res = await this.listRepository.find({ order: { id: 'desc' } });
        return res;
    }

    async getOneItem(id: number, skip: number) {

        const list = await this.listRepository.findOne({ where: { id } })
        const [result, count] = await this.resultRepository.findAndCount({ where: { testId: id }, skip: 100 * skip })

        list.data = new Page(count, 100, result)
        console.log(list.data)
        return list;
    }

    async addFlightList(body: FlightResultAddFormDto): Promise<number> {
        const flightList: InsertFlightListDto = body;
        const listRes = await this.listRepository.insert(flightList)


        return listRes.identifiers[0].id;
    }

    async updateFlightList(id: number, body: UpdateFlightListDto) {
        await this.listRepository.update(id, body)
        return id;
    }

    async deleteFlightList(id: number): Promise<number> {
        await this.listRepository.softDelete(id);
        await this.resultRepository.softDelete({ testId: id })
        return id;
    }
}
