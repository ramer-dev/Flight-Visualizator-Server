import {
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FileValidationInterceptor } from 'common/utils/file-validation.interceptor';
import path from 'path';


@Controller('file')
@ApiTags('파일 업로드 API')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Post('route')
    @ApiOperation({ summary: '파일 업로드 API', description: "파일을 업로드한다." })
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: (req, file, cb) => {
            // const ext = file.filename.split('.').pop()
            if (!file.originalname.match(/\.(txt)$/g)){
                return cb(new Error('txt 파일만 허용됩니다.'), false)
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

    @Post('ocr')
    @ApiOperation({ summary: 'OCR 파일 업로드' })
    @UseInterceptors(FilesInterceptor('file', 10, {
        fileFilter: (req, file, cb) => {
            // const ext = file.filename.split('.').pop()
            console.log(file.originalname)
            if (!file.originalname.match(/\.(png|pdf)$/g)){
                return cb(new Error('png, pdf 파일만 허용됩니다.'), false)
            }
            cb(null, true);
        }
    }))
    uploadOCRFile(@UploadedFiles() file: Express.Multer.File[]) {
        return this.fileService.uploadOCRFile(file);
    }
}