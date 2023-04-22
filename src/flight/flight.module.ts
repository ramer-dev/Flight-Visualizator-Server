import { Module } from "@nestjs/common";
import { ListController } from "./list/list.controller";
import { ListService } from "./list/list.service";
import { TypeOrmModule } from '@nestjs/typeorm'
import { List } from "./list/list.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [List]
        )
    ],
    controllers: [ListController],
    providers: [ListService],
})
export class FlightModule { }