import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller('flight/result')
@ApiTags('비행검사 결과 조회')
export class ListController {
}
