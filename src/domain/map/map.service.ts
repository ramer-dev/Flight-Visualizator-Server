import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertFrequencyDto } from 'common/dto/frequency/frequency.insert.dto';
import { UpdateFrequencyDto } from 'common/dto/frequency/frequency.update.dto';
import { Frequency } from 'entities/frequency.entity';
import { Repository } from 'typeorm';
import { join } from 'path';
import 'fs';

@Injectable()
export class MapService {
  getMap(z: string, x: string, y: string) {
    console.log(join(process.cwd(), '..', 'map', z, x, y));
    return join(process.cwd(), '..', 'map', z, x, y + '.png');
  }
}
