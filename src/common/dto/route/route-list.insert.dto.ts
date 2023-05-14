import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { isTypedArray } from "util/types";
import { RouteListBaseDto } from "./route-list.base.insert.dto";
import { InsertRouteDto } from "./route.insert.dto";

export class InsertRouteListDto extends RouteListBaseDto {
    @IsArray()
    routeData: InsertRouteDto[]
}