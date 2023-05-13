import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn, Column, JoinColumn, OneToMany } from 'typeorm';
import { Sector } from './sector.entity';

@Entity()
export class Area {
    @ApiProperty({ example: 1 })
    @PrimaryColumn()
    areaId: number;

    @ApiProperty({ example: '대구' })
    @Column()
    areaName: string;

    @ApiProperty({ example: '#434343' })
    @Column()
    areaColor: string;


    @OneToMany(() => Sector, sector => sector.sectorAreaId)
    sectorArea: Sector;
} 