import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertFrequencyDto } from "common/dto/frequency/frequency.insert.dto";
import { UpdateFrequencyDto } from "common/dto/frequency/frequency.update.dto";
import { Frequency } from "entities/frequency.entity";
import { Repository } from "typeorm";

@Injectable()
export class FrequencyService {
    constructor(
        @InjectRepository(Frequency)
        private readonly freqRepository: Repository<Frequency>,
    ) { }

    getEntireFreq() {
        return this.freqRepository.find();
    }

    getSingleFreq(frequencyId: number) {
        return this.freqRepository.find({ where: { frequencyId } })
    }

    addFreq(body: InsertFrequencyDto) {
        return this.freqRepository.insert(body);
    }

    updateFreq(id: number, body: UpdateFrequencyDto) {
        return this.freqRepository.update(id, body);
    }

    deleteFreq(id: number) {
        return this.freqRepository.softDelete(id);
    }
}