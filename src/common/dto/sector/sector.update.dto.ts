import { PartialType } from "@nestjs/swagger";
import { InsertSectorDto } from "./sector.insert.dto";

export class UpdateSectorDto extends PartialType(InsertSectorDto) { } 