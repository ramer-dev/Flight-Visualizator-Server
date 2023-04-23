import { Module } from "@nestjs/common";
import { ListController } from "./list/list.controller";
import { ListService } from "./list/list.service";
import { TypeOrmModule } from '@nestjs/typeorm'
import { FlightList } from "../entities/list.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [FlightList]
        )
    ],
    controllers: [ListController],
    providers: [ListService],
})
export class FlightModule { }