import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn, Column} from 'typeorm';

@Entity()
export class Area {
    @ApiProperty({example:1})
    @PrimaryColumn()
    sectorNum: number;

    @ApiProperty({example:'대구'})
    @Column()
    areaName: string;
} 