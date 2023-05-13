import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertAreaDto } from "common/dto/area/area.insert.dto";
import { UpdateAreaDto } from "common/dto/area/area.update.dto";
import { Area } from "entities/area.entity";
import { Repository } from 'typeorm';

@Injectable()
export class AreaService {
    constructor(
        @InjectRepository(Area)
        private readonly areaRepository: Repository<Area>
    ) { }

    getEntireArea() {
        return this.areaRepository.find();
    }

    addArea(body: InsertAreaDto) {
        return this.areaRepository.insert(body)
    }

    updateArea(id: number, body: UpdateAreaDto) {
        return this.areaRepository.update(id, body);
    }

    deleteArea(id: number) {
        return this.areaRepository.softDelete(id);
    }
} 