import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { InsertSiteDto } from "common/dto/site/site.insert.dto";
import { UpdateSiteDto } from "common/dto/site/site.update.dto";
import { SiteService } from "./site.service";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Site } from "../../entities/site.entity";
import { Roles } from "common/auth/role.decorator";
import { RolesGuard } from "common/auth/role.guard";

@ApiTags("표지소 API")
@Controller("site")
export class SiteController {
  constructor(
    private readonly siteService: SiteService
  ) {
  }

  @Get()
  @ApiOperation({ description: "전체 표지소 조회", summary: "표지소 조회" })
  @ApiOkResponse({
    type: [Site],
    description: "표지소 조회 성공"
  })
  getEntireSite() {
    return this.siteService.getEntireSite();
  }

  @Get(":id")
  getSingleSite(@Param("id") id: number) {
    return this.siteService.getSingleSite(id);
  }
  @Roles(2)
  @UseGuards(RolesGuard)
  @Post()
  addSite(@Body() body: InsertSiteDto) {
    return this.siteService.addSite(body);
  }
  @Roles(2)
  @UseGuards(RolesGuard)
  @Patch(":id")
  updateSite(@Param("id") id: number, @Body() body: UpdateSiteDto) {
    return this.siteService.updateSite(id, body);
  }
  @Roles(3)
  @UseGuards(RolesGuard)
  @Delete(":id")
  deleteSite(@Param("id") id: number) {
    return this.siteService.deleteSite(id);
  }
}
