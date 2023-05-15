import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'common/utils/multer.options.factory';
import { FileController } from './file.controller';
import { FileService } from './file.service';


@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: multerOptionsFactory,
        }),
    ],
    controllers: [FileController],
    providers: [FileService],
    exports:[FileService],
})
export class FileModule { }