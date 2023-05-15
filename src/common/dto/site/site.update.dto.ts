import { PartialType } from "@nestjs/swagger";
import { InsertSiteDto } from "./site.insert.dto";


export class UpdateSiteDto extends PartialType(InsertSiteDto){}