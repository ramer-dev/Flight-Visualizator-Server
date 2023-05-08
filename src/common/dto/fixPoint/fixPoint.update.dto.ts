import { PartialType } from "@nestjs/swagger";
import { InsertFixPointDto } from "./fixPoint.insert.dto";

export class UpdateFixPointDto extends PartialType(InsertFixPointDto){

}