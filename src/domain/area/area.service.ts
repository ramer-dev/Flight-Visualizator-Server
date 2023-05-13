import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
} 