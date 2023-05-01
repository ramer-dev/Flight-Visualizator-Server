import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies/snake-naming.strategy';

  @Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'backup',
            entities: ['entities/**/*.entity{.ts,.js}'],
            // synchronize: true,
            autoLoadEntities:true,
            namingStrategy: new SnakeNamingStrategy(),
            logging:true
        }),
    ]
})
export class DBModule { }

