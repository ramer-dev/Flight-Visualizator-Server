import { PartialType } from "@nestjs/swagger";
import { IsArray, IsOptional } from "class-validator";
import { RouteListBaseDto } from "./route-list.base.insert.dto";
import { UpdateRouteDto } from "./route.update.dto";

export class UpdateRouteListDto extends PartialType(RouteListBaseDto) {
    @IsArray()
    @IsOptional()
    routeData: UpdateRouteDto[];
 }