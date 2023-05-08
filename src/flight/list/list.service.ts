import { Injectable, Logger } from '@nestjs/common';
import { FlightList } from 'entities/flightList.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlightResult } from 'entities/flightResult.entity';
import { FlightResultFormDto } from 'common/dto/flightResultForm.dto';
import { InsertFlightListDto } from 'common/dto/flightList/flightList.insert.dto';
import { UpdateFlightListDto } from 'common/dto/flightList/flightList.update.dto';

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
        const res = await this.listRepository.find();
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

    async addFlightList(body: FlightResultFormDto) {
        const flightList: InsertFlightListDto = body;
        const listRes = await this.listRepository
            .createQueryBuilder('flight_list')
            .insert()
            .into(FlightList)
            .values(flightList)
            .execute();

        this.log.log(`add flight List. affected rows:${body.data.length}`)

        return listRes.identifiers[0].id;
    }

    async updateFlightList(id: number, body: UpdateFlightListDto) {
        await this.listRepository.update(id, body)
        this.log.log(`update flight list. id:${id}`)
        return id;
    }

    async deleteFlightList(id: number) {
        await this.listRepository.softDelete(id);
        await this.resultRepository.softDelete({ testId: id })
        this.log.log(`update flight list. id:${id}`)
        return id;
    }
}
