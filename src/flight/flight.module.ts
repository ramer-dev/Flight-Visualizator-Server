import { Module } from "@nestjs/common";
import { ListController } from "./list/list.controller";
import { ListService } from "./list/list.service";
import { TypeOrmModule } from '@nestjs/typeorm'
import { FlightList } from "../entities/flightList.entity";
import { ResultController } from "./result/result.controller";
import { ResultService } from "./result/result.service";
import { FlightResult } from "entities/flightResult.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [FlightList, FlightResult]
        )
    ],
    controllers: [ListController, ResultController],
    providers: [ListService, ResultService],
})
export class FlightModule { }