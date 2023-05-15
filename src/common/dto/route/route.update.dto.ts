import { PartialType } from "@nestjs/swagger";
import { RouteBaseDto } from "./route.base.insert.dto";
import { InsertRouteDto } from "./route.insert.dto";

export class UpdateRouteDto extends PartialType(RouteBaseDto) { } 