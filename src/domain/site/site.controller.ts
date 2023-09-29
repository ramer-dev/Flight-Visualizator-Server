import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { InsertSiteDto } from "common/dto/site/site.insert.dto";
import { UpdateSiteDto } from "common/dto/site/site.update.dto";
import { SiteService } from "./site.service";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Site } from "../../entities/site.entity";
import { Roles } from "common/auth/role.decorator";
import { RolesGuard } from "common/auth/role.guard";
import { Request } from "express";
import { printWinstonLog } from "logger/logger.factory";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { RealIP } from "nestjs-real-ip";

@ApiTags("표지소 API")
@Controller("site")
export class SiteController {
  constructor(
    private readonly siteService: SiteService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {
  }

  @Get()
  @ApiOperation({ description: "전체 표지소 조회", summary: "표지소 조회" })
  @ApiOkResponse({
    type: [Site],
    description: "표지소 조회 성공"
  })
  getEntireSite(@RealIP() ip: string) {

    printWinstonLog(this.logger, {
      message: `[GET] Entire Site`,
      module: SiteController.name,
      ip: ip
    }, 'info')
    try {
      return this.siteService.getEntireSite();
    } catch (e) {
      printWinstonLog(this.logger, {
        message: `[GET] Failed to Get Entire Site`,
        module: SiteController.name,
        ip: ip
      }, 'error')
    }
  }

  @Get(":id")
  getSingleSite(@Param("id") id: number, @RealIP() ip: string) {
    printWinstonLog(this.logger, {
      message: `[GET] Single Site | ID : ${id}`,
      module: SiteController.name,
      ip: ip
    }, 'info')
    try {
      return this.siteService.getSingleSite(id);
    } catch (e) {
      printWinstonLog(this.logger, {
        message: `[GET] Failed to Get Single Site | ID : ${id}`,
        module: SiteController.name,
        ip: ip
      }, 'error')
    }
  }
  @Roles(2)
  @UseGuards(RolesGuard)
  @Post()
  addSite(@Body() body: InsertSiteDto, @RealIP() ip: string) {
    printWinstonLog(this.logger, {
      message: `[POST] Add Site ${body.siteName}`,
      module: SiteController.name,
      ip: ip
    }, 'info')
    try {
      return this.siteService.addSite(body);
    } catch (e) {
      printWinstonLog(this.logger, {
        message: `[POST] Failed to Add Site ${body.siteName}`,
        module: SiteController.name,
        ip: ip
      }, 'error')
    }
  }
  @Roles(2)
  @UseGuards(RolesGuard)
  @Patch(":id")
  updateSite(@Param("id") id: number, @Body() body: UpdateSiteDto, @RealIP() ip: string) {
    printWinstonLog(this.logger, {
      message: `[PATCH] Update Site ${body.siteName}`,
      module: SiteController.name,
      ip: ip
    }, 'info')
    try {
      return this.siteService.updateSite(id, body);
    } catch (e) {
      printWinstonLog(this.logger, {
        message: `[PATCH] Failed to Update Site ${body.siteName}`,
        module: SiteController.name,
        ip: ip
      }, 'error')
    }
  }
  @Roles(3)
  @UseGuards(RolesGuard)
  @Delete(":id")
  deleteSite(@Param("id") id: number, @RealIP() ip: string) {
    printWinstonLog(this.logger, {
      message: `[DELETE] Site | ID : ${id}`,
      module: SiteController.name,
      ip: ip
    }, 'info')
    try {
      return this.siteService.deleteSite(id);
    } catch (e) {
      printWinstonLog(this.logger, {
        message: `[DELETE] Failed to Delete Site | ID : ${id}`,
        module: SiteController.name,
        ip: ip
      }, 'error')
    }
  }
}
