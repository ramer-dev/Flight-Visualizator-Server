import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'enroute',
            entities: ['entities/**/*.entity{.ts,.js}'],
            // synchronize: true,
            autoLoadEntities:true,
        }),
    ]
})
export class DBModule { }

