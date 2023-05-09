import { PartialType } from "@nestjs/swagger";
import { InsertFixPointDto } from "./fix-point.insert.dto";

export class UpdateFixPointDto extends PartialType(InsertFixPointDto){

}