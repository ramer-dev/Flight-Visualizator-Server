import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ListService } from "./list.service";

@Controller('flight/list')
@ApiTags('비행검사 전체 목록 조회')
export class ListController{
    constructor(private readonly listService:ListService){}

    @Get()
    @ApiOperation({summary:'전체 목록 조회', description:'전체 목록 조회'})
    getAllList(){
        return this.listService.getAllList();
    }
}