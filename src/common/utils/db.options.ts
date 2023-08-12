import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import configuration from 'config/configuration';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies/snake-naming.strategy';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private config: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.config.get('DB_HOST'),
            port: this.config.get('DB_PORT'),
            username: this.config.get('DB_ID'),
            password: this.config.get('DB_PW'),
            database: this.config.get('DB_DATABASE'),
            entities: ['entities/**/*.entity{.ts,.js}'],
            // synchronize: true,
            legacySpatialSupport: false,
            autoLoadEntities: true,
            namingStrategy: new SnakeNamingStrategy(),
            logging: true
        }
    }
}

// console.log(configuration())
// @Module({
//     imports: [
    
//     ]
// })


