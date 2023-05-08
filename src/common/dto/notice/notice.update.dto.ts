import { PartialType } from "@nestjs/mapped-types";
import { InsertNoticeDto } from "./notice.insert.dto";

export class UpdateNoticeDto extends PartialType(InsertNoticeDto) { } 