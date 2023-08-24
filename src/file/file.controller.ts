import {
    BadRequestException,
    Controller,
    FileTypeValidator,
    Get,
    Logger,
    ParseFilePipe,
    Post,
    Query,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FileValidationInterceptor } from 'common/utils/file-validation.interceptor';
import path from 'path';

const log = new Logger('FileService')


@Controller('file')
@ApiTags('파일 업로드 API')
export class FileController {

    constructor(private readonly fileService: FileService) { }

    @Post('route')
    @ApiOperation({ summary: '파일 업로드 API', description: "파일을 업로드한다." })
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: (req, file, cb) => {
            log.log(file)

            const allowedMimeTypes = ['text/plain', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
            if (!allowedMimeTypes.includes(file.mimetype)) {
                return cb(new BadRequestException('txt, csv, xls 또는 xlsx 파일만 허용됩니다.'), false);
            }

            cb(null, true);
        }
    }))
    uploadRouteFile(
        @UploadedFile()
        file: Express.Multer.File
    ) {
        return this.fileService.uploadRouteFile(file);
    }

    @Get('route')
    @ApiOperation({ summary: '경로 Parse API', description: "경로를 전달한다." })
    getRouteFromFile(@Query('filename') filename: string) {
        return this.fileService.getRouteFromFile(filename)
    }

    @Post('ocr')
    @ApiOperation({ summary: 'OCR 파일 업로드' })
    @UseInterceptors(FilesInterceptor('file', 10, {
        fileFilter: (req, file, cb) => {
            // const ext = file.filename.split('.').pop()
            console.log(file.originalname)
            if (!file.originalname.match(/\.(png|pdf)$/g)) {
                return cb(new Error('png, pdf 파일만 허용됩니다.'), false)
            }
            cb(null, true);
        }
    }))
    uploadOCRFile(@UploadedFiles() file: Express.Multer.File[]) {
        return this.fileService.uploadOCRFile(file);
    }
}