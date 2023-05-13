import { PartialType } from "@nestjs/swagger";
import { InsertAreaDto } from "./area.insert.dto";

export class UpdateAreaDto extends PartialType(InsertAreaDto) {}
