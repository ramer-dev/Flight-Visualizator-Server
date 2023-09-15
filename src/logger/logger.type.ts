export type LevelType = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

export interface LoggerMessageType {
    timestamp?: Date
    level? : LevelType,
    module : string,
    ip? : string,
    message: any
} 