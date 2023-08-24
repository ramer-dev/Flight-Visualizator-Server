import { BadRequestException, Injectable, Logger, UnsupportedMediaTypeException } from '@nestjs/common';
import fs from 'fs'
import xlsx from 'xlsx'

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

        const ext = filename.split('.').pop();
        switch (ext) {
            case 'txt':
                return this.parseText(filename);
            case 'csv':
                break;

            case 'xls':
            case 'xlsx':
                return this.parseExcel(filename);
        }
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

    private parseExcel(filename: string) {
        console.time('측정 시작')
        const workbook = xlsx.readFile(`./uploads/route/${filename}`, { type: 'binary' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        console.timeEnd('측정 시작')

        const data = [];
        let lastLat = null;
        let lastLng = null;

        const COORDINATE_ERROR_VARIANT = 0.25;

        for (const i of Object.keys(firstSheet)) {
            const cellValue = firstSheet[i].v;
            if (!cellValue || !cellValue.substring) { continue }

            const numberParts = cellValue.substring(1).split(' : ').map(Number)
            const numberValue = Number((numberParts[0] + numberParts[1] / 100 + numberParts[2] / 10000).toFixed(4))
            switch (i[0]) {
                case 'E':
                    const currentLat = this.convertToWGS(numberValue);
                    if (lastLat !== null && Math.abs(lastLat - currentLat) > COORDINATE_ERROR_VARIANT) {
                        continue;
                    }
                    lastLat = currentLat;
                    break;
                case 'F':
                    const currentLng = this.convertToWGS(numberValue);
                    if (lastLng !== null && Math.abs(lastLng - currentLng) > COORDINATE_ERROR_VARIANT) {
                        continue;
                    }
                    lastLng = currentLng;
                    break;
                case 'G':
                    if (lastLat && lastLng)
                        data.push({ lat: lastLat, lng: lastLng, height: +cellValue });
                    break;
            }
        }

        const length = data.length;
        const result = { route: [], length }

        for (let i = 1; i < length; i++) {
            result.route.push({ coords: { lat: data[i].lat, lng: data[i].lng }, height: data[i].height })
        }

        return (result)
    }

    async parseText(filename: string) {
        const textFile = await fs.readFileSync(`./uploads/route/${filename}`, 'utf-8')
        const rawData = textFile.split('\n').map(t => t.split(/\s+/).filter(a => a !== ''));
        const data = []
        const currentLat = null;
        const currentLng = null;

        for (let row of rawData){
            if(currentLat !== null)
        }
        // const data = rawData.map(row => { return { height: row[7], coords: [row[8], row[9]] } }).splice(1)
        return data
    }

    private convertToWGS(coord: number) {
        const degree = Math.floor(coord);
        const minutes = ((coord - degree) * 100) / 60
        const seconds = (((coord - degree - minutes)) / 3600)
        return Number((degree + minutes + seconds).toFixed(6))
    }
}