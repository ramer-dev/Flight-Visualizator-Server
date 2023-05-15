import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertSiteDto } from "common/dto/site/site.insert.dto";
import { UpdateSiteDto } from "common/dto/site/site.update.dto";
import { Site } from "entities/site.entity";
import { Repository } from "typeorm";

@Injectable()
export class SiteService {
    constructor(
        @InjectRepository(Site)
        private readonly siteRepository: Repository<Site>
    ) { }

    getEntireSite() {
        return this.siteRepository.find();
    }

    getSingleSite(id: number) {
        return this.siteRepository.findOne({ where: { siteId: id } })
    }

    addSite(body: InsertSiteDto) {
        return this.siteRepository.insert(body);
    }

    updateSite(id: number, body: UpdateSiteDto) {
        return this.siteRepository.update(id, body);
    }

    deleteSite(id: number) {
        return this.siteRepository.softDelete({ siteId: id });
    }
}