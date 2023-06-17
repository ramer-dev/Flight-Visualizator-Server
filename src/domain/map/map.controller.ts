import { Controller, Get, Param, Res } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { InsertFrequencyDto } from 'common/dto/frequency/frequency.insert.dto';
import { UpdateFrequencyDto } from 'common/dto/frequency/frequency.update.dto';
import { MapService } from './map.service';
import { join } from "path";
import fs from "fs";
import { Response } from "express";

@Controller('map')
@ApiTags('지도 API')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get(':z/:x/:y')
  getSingleMap(
    @Param('z') z: string,
    @Param('x') x: string,
    @Param('y') y: string,
    @Res() res: Response,
  ) {
    const imagePath = join(process.cwd(), 'map', z, x, y + '.png');

    const stream = fs.createReadStream(imagePath);
    return stream.pipe(res);
    // return this.mapService.getMap(z, x, y);
  }
}
