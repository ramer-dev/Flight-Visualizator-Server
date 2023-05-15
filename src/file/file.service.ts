import { BadRequestException, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import fs from 'fs'

@Injectable()
export class FileService {
    uploadRouteFile(file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('파일이 존재하지 않습니다..');
        }

        return { filePath: file.path };
    }

    uploadOCRFile(file: Express.Multer.File[]) {
        if (!file) {
            throw new BadRequestException('파일이 존재하지 않습니다..');
        }
        // let flag = false;

        const result = file.map(t => {
            if (t.mimetype === 'image/png' || t.mimetype === 'application/pdf') {
                return t.path
            }
            // flag = true;
            throw new UnsupportedMediaTypeException('지원하지 않는 형식입니다.')
        })

        // if(flag) throw new UnsupportedMediaTypeException(
        
        return { filePath: result, count: result.length };

    }
}