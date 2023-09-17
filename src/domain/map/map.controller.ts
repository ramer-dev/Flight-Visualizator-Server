import { Controller, Get, HttpException, HttpStatus,  Param, Req, Res } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { join } from "path";
import fs from "fs";
import { Request, Response } from "express"; 

@Controller('map')
@ApiTags('지도 API')
export class MapController {
  @Get(':z/:x/:y')
  getSingleMap(
    @Param('z') z: string,
    @Param('x') x: string,
    @Param('y') y: string,
    @Res() res: Response,
    @Req() req: Request
  ) {
    const imagePath = join(process.cwd(), 'map', z, x, y + '.png');

    // if (fs.existsSync(imagePath)) {
    // const filename = `\\${y}.png`
    // const stream = fs.createReadStream(imagePath + filename);
    // return stream.pipe(res);
    // console.log(imagePath);
    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath)
    }
    else {
      throw new HttpException({
        message: 'File Not Found',
      },
        HttpStatus.NO_CONTENT)
    }
  }
}
