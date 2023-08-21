import { BadRequestException, Injectable, Logger, UnsupportedMediaTypeException } from '@nestjs/common';
import fs from 'fs'

@Injectable()

export class FileService {
    log = new Logger('FileService');
    uploadRouteFile(file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('파일이 존재하지 않습니다..');
        }

        this.log.log(`file Uploaded fileName: ${file.filename}`)
        return { filePath: file.filename };
    }

    getRouteFromFile(filename: string) {
        if (!filename) {
            return null
        }

        const data = fs.readFile(`./uploads/route/${filename}`, 'utf8', (error, data) => {
            if (error) {
                this.log.error(error)
                return
            }

            // 파싱 기능 추가 필요
            console.log(data)
        })
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