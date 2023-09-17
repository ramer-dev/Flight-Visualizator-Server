import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertRouteListDto } from "common/dto/route/route-list.insert.dto";
import { UpdateRouteListDto } from "common/dto/route/route-list.update.dto";
import { InsertRouteDto } from "common/dto/route/route.insert.dto";
import { RouteList } from "entities/route-list.entity";
import { Route } from "entities/route.entity";
import { Repository } from "typeorm";

@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>,
        @InjectRepository(RouteList)
        private readonly routeListRepository: Repository<RouteList>
    ) { }

    getEntireRoute() {
        return this.routeListRepository.find({ relations: ['routeData', 'routeData.routePointData'], order: { routeData: { routeEntry: 'ASC' } } });
    }

    getSingleRoute(id: number) {
        return this.routeListRepository.findOne({ where: { routeId: id }, relations: ['routeData', 'routeData.routePointData'], order: { routeData: { routeEntry: 'ASC' } } });
    }

    // 1. list data를 insert
    // 2. entry data insert
    async addSingleRoute(body: InsertRouteListDto) {
        const { routeName } = body;

        const routeData = body.routeData.map((t, i) => {
            return {
                routePoint:t.routeName,
                routeName: routeName,
                routeEntry: i + 1
            }
        })

        if (await this.routeListRepository.findOne({ where: { routeName } })) {
            throw new ConflictException('중복된 이름입니다.')
        }

        await this.routeListRepository.insert({ routeName });
        return await this.routeRepository.insert(routeData)
    }

    async updateRoute(id: number, body: InsertRouteListDto) {
        // route에서 routeID가 id와 같은 경우 삭제
        // routeList body에 맞게 update
        // route 정보 업데이트 
        const { routeName } = body;
        const findById = await this.routeListRepository.findOne({ where: { routeId: id } });
        const findByName = await this.routeListRepository.findOne({ where: { routeName } });
        const routeData = body.routeData.map((t, i) => {
            return {
                routePoint:t.routeName,
                routeName: routeName,
                routeEntry: i + 1
            }
        })



        const updateFunc = async () => {
            await this.routeRepository.delete({ routeName: findById.routeName });
            await this.routeListRepository.update(id, { routeId: id, routeName });
            return await this.routeRepository.insert(routeData);
        }

        // const updateListFunc = this.routeListRepository.update(id, body)

        try {
            if (findByName) {
                // 찾은 결과가 있고 ID가 다른 경우 (중복), 
                if (findByName.routeId !== id) {
                    throw new ConflictException('중복된 이름입니다.')
                } else {
                    // this.log.log(`Conflict name ${findByName.routeId}`)
                    return await updateFunc();
                }
            } else {
                return await updateFunc();
            }
        } catch (e) {
            throw e;
        }

    }

    async deleteRoute(id: number) {
        return await this.routeListRepository.delete({ routeId: id });
    }
}
