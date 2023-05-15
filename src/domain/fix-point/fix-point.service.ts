import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PointType } from "common/dto/coordinate.types";
import { InsertFixPointDto } from "common/dto/fix-point/fix-point.insert.dto";
import { UpdateFixPointDto } from "common/dto/fix-point/fix-point.update.dto";
import { FixPoint } from "entities/fix-point.entity";
import { Repository } from 'typeorm';

@Injectable()
export class FixPointService {
    constructor(
        @InjectRepository(FixPoint)
        private readonly fixPointRepository: Repository<FixPoint>
    ) { }


    getEntireFixPoint() {
        try {
            return this.fixPointRepository.find();
        } catch (e) {
            throw e;
        }
    }

    async getSingleFixPoint(id: number) {
        try {
            const result = await this.fixPointRepository.findOne({ where: { id } });
            if (!result) {
                throw new NotFoundException("해당하는 픽스점을 찾지 못했습니다.")
            }
            return result;
        } catch (e) {
            throw e;
        }
    }

    async createFixPoint(body: InsertFixPointDto) {
        const { pointCoordinate, pointName } = body;
        // const point: PointType = { lat: pointCoordinate[0], lng: pointCoordinate[1] }
        try {
            await this.fixPointRepository
                .createQueryBuilder()
                .insert()
                .into(FixPoint)
                .values({pointName, pointCoordinate})
                .execute()
        } catch (err) {
            throw err;
        }
    }

    async updateFixPoint(id: number, body: UpdateFixPointDto) {
        const { pointCoordinate, pointName } = body;
        // const point: PointType = { lat: pointCoordinate[0], lng: pointCoordinate[1] }

        try {
            await this.fixPointRepository
                .createQueryBuilder()
                .update()
                .set({ pointName, pointCoordinate })
                .where({ id })
                .execute()
        } catch (e) {
            throw e;
        }
    }

    async deleteFixPoint(id: number) {
        try {
            const result = await this.fixPointRepository.softDelete(id);
            if (!result.affected) {
                throw new NotFoundException("해당하는 픽스점을 찾지 못했습니다.")
            }
            return result.affected;
        } catch (e) {
            throw e;
        }
    }

}
