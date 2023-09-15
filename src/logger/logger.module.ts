import { Module } from '@nestjs/common';
import * as winston from 'winston';
import {
    utilities as nestWinstonModuleUtilities,
    WinstonModule,
} from 'nest-winston';
import winstonDaily from 'winston-daily-rotate-file'
import { ConfigModule } from '@nestjs/config';
import path from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
                    format: winston.format.combine(
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        nestWinstonModuleUtilities.format.nestLike('FLYCHECK_API', { prettyPrint: true }),
                        winston.format.colorize(),
                        winston.format.printf(
                            (info) =>
                                `[${info.timestamp}] (${info.level}) FLYCHECK_API.${info.module} : (${info.ip}) : ${info.message}`,
                        ),

                    ),
                }),
                new winstonDaily({
                    level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
                    format: winston.format.combine(
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        winston.format.colorize(),
                        winston.format.printf(
                            (info) =>
                                `[${info.timestamp}] (${info.level}) FLYCHECK_API.${info.module} : (${info.ip}) : ${info.message}`,
                        ),
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),

                    ),
                    dirname: path.join(process.cwd(), 'log'),
                    filename: '%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                }),
            ],
        }),
    ],
})
export class LoggerModule { }