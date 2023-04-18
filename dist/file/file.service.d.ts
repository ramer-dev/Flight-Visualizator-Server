/// <reference types="multer" />
export declare class FileService {
    uploadFile(file: Express.Multer.File): {
        filePath: string;
    };
}
