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
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FileValidationInterceptor } from 'common/utils/file-validation.interceptor';
import path, { extname, join } from 'path';
import { createReadStream } from 'fs';
import { Roles } from 'common/auth/role.decorator';
import { RolesGuard } from 'common/auth/role.guard';

const log = new Logger('FileService')


@Controller('file')
@ApiTags('파일 업로드 API')
export class FileController {

    constructor(private readonly fileService: FileService) { }
    @Roles(2)
    @UseGuards(RolesGuard)
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
    @Roles(2)
    @UseGuards(RolesGuard)
    @Post('ocr')
    @ApiOperation({ summary: 'OCR 파일 업로드' })
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: (req, file, cb) => {
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const ext = extname(file.originalname)
            if (!allowedExtensions.includes(ext)) {
                return cb(new Error('jpg, png 파일만 허용됩니다.'), false)
            }
            cb(null, true);
        }
    }))
    async uploadOCRFile(@UploadedFile() file:Express.Multer.File) {
        return this.fileService.uploadOCRFile(file);
    }
}