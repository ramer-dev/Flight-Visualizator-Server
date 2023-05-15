import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { InsertSiteDto } from "common/dto/site/site.insert.dto";
import { UpdateSiteDto } from "common/dto/site/site.update.dto";
import { SiteService } from "./site.service";

@Controller('site')
export class SiteController {
    constructor(
        private readonly siteService: SiteService
    ) { }

    @Get()
    getEntireSite() {
        return this.siteService.getEntireSite();
    }

    @Get(':id')
    getSingleSite(@Param('id') id: number) {
        return this.siteService.getSingleSite(id);
    }

    @Post()
    addSite(@Body() body: InsertSiteDto) {
        return this.siteService.addSite(body);
    }

    @Patch(':id')
    updateSite(@Param('id') id: number, @Body() body: UpdateSiteDto) {
        return this.siteService.updateSite(id, body);
    }

    @Delete(':id')
    deleteSite(@Param('id') id: number) {
        return this.siteService.deleteSite(id)
    }
}
