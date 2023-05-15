import { ConflictException, Injectable } from "@nestjs/common";
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
        return this.routeListRepository.find({ relations: ['routeData', 'routeData.routePointData'] });
    }

    getSingleRoute(id: number) {
        return this.routeListRepository.findOne({ where: { routeId: id }, relations: ['routeData', 'routeData.routePointData'] });
    }

    // 1. list data를 insert
    // 2. entry data insert
    async addSingleRoute(body: InsertRouteListDto) {
        const { routeName } = body;

        const routeData = body.routeData.map((t, i) => {
            t.routeName = routeName;
            t.routeEntry = i + 1;
            return t
        })

        if (await this.routeListRepository.findOne({ where: { routeName } })) {
            throw new ConflictException('중복된 이름입니다.')
        }

        await this.routeListRepository.insert({ routeName });
        return await this.routeRepository.insert(routeData)
    }

    async updateRoute(id: number, body: UpdateRouteListDto) {
        const { routeId, routeName } = body;
        const findById = await this.routeListRepository.findOne({ where: { routeId: id } });
        const findByName = await this.routeListRepository.findOne({ where: { routeName } });

        const routeData = body.routeData.map((t, i) => {
            t.routeName = routeName;
            t.routeEntry = i + 1;
            return t;
        })

        const updateFunc = async () => {
            await this.routeRepository.delete({ routeName: findById.routeName });
            await this.routeListRepository.update(id, { routeId, routeName });
            return await this.routeRepository.insert(routeData);
        }

        // const updateListFunc = this.routeListRepository.update(id, body)

        try {
            if (findByName) {
                // 찾은 결과가 있고 ID가 다른 경우 (중복), 
                if (findByName.routeId !== id) {
                    throw new ConflictException('중복된 이름입니다.')
                } else {
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
