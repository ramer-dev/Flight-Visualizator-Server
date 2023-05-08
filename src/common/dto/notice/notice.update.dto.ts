import { PartialType } from "@nestjs/swagger";
import { InsertNoticeDto } from "./notice.insert.dto";


export class UpdateNoticeDto extends PartialType(InsertNoticeDto) { } 