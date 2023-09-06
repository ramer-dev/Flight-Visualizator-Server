import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertAreaDto } from "common/dto/area/area.insert.dto";
import { UpdateAreaDto } from "common/dto/area/area.update.dto";
import { Area } from "entities/area.entity";
import { Sector } from "entities/sector.entity";
import { Repository } from 'typeorm';

@Injectable()
export class AreaService {
    constructor(
        @InjectRepository(Area)
        private readonly areaRepository: Repository<Area>,
        @InjectRepository(Sector)
        private readonly sectorRepository: Repository<Sector>
    ) { }

    getValidArea() {
        return this.areaRepository.createQueryBuilder('area').where('area_id > 0').getMany()
    }

    getEntireArea() {
        return this.areaRepository.createQueryBuilder('area').getMany()
    }

    addArea(body: InsertAreaDto) {
        return this.areaRepository.insert(body)
    }

    updateArea(id: number, body: UpdateAreaDto) {
        return this.areaRepository.update(id, body);
    }

    deleteArea(id: number) {
        this.sectorRepository.createQueryBuilder('sector').update(Sector).set({sectorAreaId:0}).where(`sector_area_id = ${id}`).execute();
        return this.areaRepository.softDelete(id);

    }
} 