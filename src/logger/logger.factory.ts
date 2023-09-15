import { LevelType, LoggerMessageType } from "./logger.type";



export function printWinstonLog(logger, dto : LoggerMessageType, level : LevelType) {
    switch (level) {
        case 'error':
            logger.error('error: ', dto);
            break;
        case 'warn':
            logger.warn('warn: ', dto);
            break;
        case 'info':
            logger.info('info: ', dto);
            break;
        case 'http':
            logger.http('http: ', dto);
            break;
        case 'verbose':
            logger.verbose('verbose: ', dto);
            break;
        case 'debug':
            logger.debug('debug: ', dto);
            break;
        case 'silly':
            logger.silly('silly: ', dto);
            break;
    }
}