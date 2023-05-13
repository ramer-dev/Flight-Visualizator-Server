import { PartialType } from "@nestjs/swagger";
import { InsertRouteDto } from "./route.insert.dto";

export class UpdateRouteDto extends PartialType(InsertRouteDto) { } 