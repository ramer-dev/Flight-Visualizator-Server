import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';


@Controller('file')
@ApiTags('파일 업로드 API')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Post('upload')
    @ApiOperation({ summary: '파일 업로드 API', description: "파일을 업로드한다." })
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(
        @UploadedFile()
        file: Express.Multer.File
    ) {
        return this.fileService.uploadFile(file);
    }
}