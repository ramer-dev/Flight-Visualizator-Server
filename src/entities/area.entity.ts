import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn, Column, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Sector } from './sector.entity';

@Entity()
export class Area {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    areaId: number;

    @ApiProperty({ example: '대구' })
    @Column()
    areaName: string;

    @ApiProperty({ example: '#434343' })
    @Column()
    areaColor: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Sector, sector => sector.sectorArea)
    sectorArea: Sector;
} 