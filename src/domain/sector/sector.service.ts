import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertSectorDto } from "common/dto/sector/sector.insert.dto";
import { UpdateSectorDto } from "common/dto/sector/sector.update.dto";
import { Sector } from "entities/sector.entity";
import { Repository } from 'typeorm';

@Injectable()
export class SectorService {
    constructor(
        @InjectRepository(Sector)
        private readonly sectorRepository: Repository<Sector>
    ) { }

    getSingleSector(id: number) {
        return this.sectorRepository.findOne({ where: { id }, relations: ['sectorArea'] })
        // return this.sectorRepository.createQueryBuilder('sector')
        //     .innerJoinAndSelect('sector.sectorArea', 'area')
        //     .where('sector.id = :id', { id })
        //     .getOne();
    }

    getEntireSector() {
        return this.sectorRepository.find({ relations: ['sectorArea'] });
    }

    async createSector(body: InsertSectorDto) {
        const finder = await this.sectorRepository.findOne({ where: { sectorName: body.sectorName }})

        if(finder){
            throw new ConflictException('중복된 이름입니다.')
        } else {
            return await this.sectorRepository.insert(body);
        }
    }

    async updateSector(id: number, body: UpdateSectorDto) {
        return this.sectorRepository.update({id}, body);
    }

    deleteSector(id: number) {
        return this.sectorRepository.softDelete(id);
    }
}
