import { Controller, Get, HttpException, HttpStatus, Param, Res } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { InsertFrequencyDto } from 'common/dto/frequency/frequency.insert.dto';
import { UpdateFrequencyDto } from 'common/dto/frequency/frequency.update.dto';
import { join } from "path";
import fs from "fs";
import { Response } from "express";

@Controller('map')
@ApiTags('지도 API')
export class MapController {

  @Get(':z/:x/:y')
  getSingleMap(
    @Param('z') z: string,
    @Param('x') x: string,
    @Param('y') y: string,
    @Res() res: Response,
  ) {
    const imagePath = join(process.cwd(), 'map', z, x, y + '.png');

    // if (fs.existsSync(imagePath)) {
    // const filename = `\\${y}.png`
    // const stream = fs.createReadStream(imagePath + filename);
    // return stream.pipe(res);
    // console.log(imagePath);
    if (fs.existsSync(imagePath)) res.sendFile(imagePath)
    else {
      throw new HttpException({
        message: 'File Not Found',
      },
        HttpStatus.NO_CONTENT)
    }
  }
}
