import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "common/auth/jwt.guard";
import { ListService } from "./list.service";

@Controller('flight/list')
@ApiTags('비행검사 전체 목록 조회')
export class ListController {
    constructor(private readonly listService: ListService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '전체 목록 조회', description: '전체 목록 조회' })
    getAllList() {
        return this.listService.getAllList();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getListItem(@Param('id') id: string) {
        return this.listService.getListItem(id);
    }

}