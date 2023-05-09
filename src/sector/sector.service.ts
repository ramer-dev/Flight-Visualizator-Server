import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertSectorDto } from "common/dto/sector/sector.insert.dto";
import { Sector } from "entities/sector.entity";
import { Repository } from 'typeorm';

@Injectable()
export class SectorService {
    constructor(
        @InjectRepository(Sector)
        private readonly sectorRepository: Repository<Sector>
    ) { }

    getSingleSector(id: number) {
        return this.sectorRepository.findOne({ where: { id } })
    }

    getEntireSector() {
        return this.sectorRepository.find();
    }

    createSector(body : InsertSectorDto) {
        return this.sectorRepository.insert(body);
    }
}
