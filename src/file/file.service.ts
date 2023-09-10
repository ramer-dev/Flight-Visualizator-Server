import { BadRequestException, Injectable, Logger, UnsupportedMediaTypeException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import fs, { createReadStream } from 'fs'
import { join } from 'path';
import formData from 'form-data'
import xlsx from 'xlsx'



@Injectable()

export class FileService {
    constructor(private config: ConfigService) { }
    COORDINATE_ERROR_VARIANT = 0.25;

    log = new Logger('FileService');

    streamToBlob(stream: fs.ReadStream) {
        return new Promise((resolve, reject) => {
            const chunks = [];

            stream.on('data', chunk => {
                chunks.push(chunk);
            });

            stream.on('end', () => {
                const blob = new Blob(chunks, { type: 'image/jpg' });
                resolve(blob);
            });

            stream.on('error', error => {
                reject(error);
            });
        });
    }

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
            default:
                throw new BadRequestException('파일 에러')
        }
    }

    async uploadOCRFile(file: any) {
        if (!file) {
            throw new BadRequestException('파일이 존재하지 않습니다..');
        }
        let b: Blob;



        const form = new formData();
        form.append('data', fs.createReadStream(file.path), file.originalname)

        this.log.log(`awaiting OCR image \t :: ${file.originalname} `)
        try {
            const response = await axios.post(`http://${this.config.get('DB_HOST')}:7001/`, form, {
                proxy:false,
                headers: {
                    ...form.getHeaders(),
                },
            })
            console.log(response.data)
            return response.data

        } catch (e) {
            console.error(e)
        }




    }

    private parseExcel(filename: string) {
        const workbook = xlsx.readFile(`./uploads/route/${filename}`);
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        // const header = xlsx.utils.sheet_to_json(firstSheet, {range:3})
        const data = [];
        let lastLat = null;
        let lastLng = null;
        let hasSkipped = false;
        // 간단한 파일 확인
        if (!(firstSheet['E4'].v === 'LAT' && firstSheet['F4'].v === 'LON')) {
            throw new BadRequestException('잘못된 엑셀 파일 형식입니다.')
        }

        for (const i of Object.keys(firstSheet)) {
            const cellValue = firstSheet[i].v;
            if (!cellValue || !cellValue.substring) { continue }

            const numberParts = cellValue.substring(1).split(' : ').map(Number)
            const numberValue = Number((numberParts[0] + numberParts[1] / 100 + numberParts[2] / 10000).toFixed(6))
            switch (i[0]) {
                case 'E':
                    const currentLat = this.convertToWGS(numberValue);
                    if (lastLat !== null && Math.abs(lastLat - currentLat) > this.COORDINATE_ERROR_VARIANT) {
                        hasSkipped = true;
                        continue;
                    }
                    lastLat = currentLat;
                    break;
                case 'F':
                    const currentLng = this.convertToWGS(numberValue);
                    if (lastLng !== null && Math.abs(lastLng - currentLng) > this.COORDINATE_ERROR_VARIANT) {
                        hasSkipped = true;
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
        const data = { route: [] }
        let lastLat = null;
        let lastLng = null;
        let skip = false;
        // 간단한 파일 확인
        if (!(rawData[0][7] === 'LAT' && rawData[0][8] === 'LON')) {
            throw new BadRequestException('잘못된 TXT 파일 형식입니다.')
        }
        if (rawData.length > 500) skip = true;


        for (let row of rawData) {

            for (let i = 8; i < 10; i++) {
                switch (i) {
                    // 고도
                    case 8:
                        const currentLat = +row[i]
                        if (lastLat !== null && Math.abs(lastLat - currentLat) > this.COORDINATE_ERROR_VARIANT) {
                            continue;
                        }
                        lastLat = currentLat;
                        break;
                    case 9:
                        const currentLng = +row[i]
                        if (lastLng !== null && Math.abs(lastLng - currentLng) > this.COORDINATE_ERROR_VARIANT) {
                            continue;
                        }
                        lastLng = currentLng;
                        break;

                }
            }
            if (lastLat && lastLng)
                data.route.push({ coords: { lat: Number(lastLat.toFixed(8)), lng: Number(lastLng.toFixed(8)) }, height: +row[7] })
        }
        // const data = rawData.map(row => { return { height: row[7], coords: [row[8], row[9]] } }).splice(1)

        if (skip) {
            data.route = data.route.filter((t, i) => i % 2 === 0)
        }
        data['length'] = data.route.length;

        return data;
    }

    private convertToWGS(coord: number) {
        const degree = Math.floor(coord);
        const minutes = ((coord - degree) * 100) / 60
        const seconds = (((coord - degree - minutes)) / 3600)
        return Number((degree + minutes + seconds).toFixed(6))
    }
}