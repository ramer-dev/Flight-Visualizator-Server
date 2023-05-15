import { PartialType } from "@nestjs/swagger";
import { InsertFrequencyDto } from "./frequency.insert.dto";

export class UpdateFrequencyDto extends PartialType(InsertFrequencyDto) {}