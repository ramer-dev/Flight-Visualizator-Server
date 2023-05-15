import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Frequency } from 'entities/frequency.entity';
import { FrequencyController } from './frequency.controller';
import { FrequencyService } from './frequency.service';

@Module({
    imports: [TypeOrmModule.forFeature([Frequency])],
    controllers: [FrequencyController],
    providers: [FrequencyService]
})
export class FrequencyModule { }


