import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "common/auth/jwt.guard";
import { Roles } from "common/auth/role.decorator";
import { RolesGuard } from "common/auth/role.guard";
import { ListService } from "./list.service";

@Controller('flight/list')
@ApiTags('비행검사 전체 목록 조회')
export class ListController {
    constructor(private readonly listService: ListService) { }

    @Get()
    @Roles(1)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: '전체 목록 조회', description: '전체 목록 조회' })
    getAllList() {
        return this.listService.getAllList();
    }

    @Get(':id')
    @Roles(1)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({summary:'비행검사 아이템 조회', description: '전체 비행검사 목록 중 하나를 조회합니다.'})
    getListItem(@Param('id') id: string) {
        return this.listService.getListItem(id);
    }

}