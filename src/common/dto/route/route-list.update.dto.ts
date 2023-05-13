import { PartialType } from "@nestjs/swagger";
import { InsertRouteListDto } from "./route-list.insert.dto";

export class UpdateRouteListDto extends PartialType(InsertRouteListDto) { }