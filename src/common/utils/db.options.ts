import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/flight/list/list.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'enroute',
            // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
            autoLoadEntities:true,
        }),
    ]
})
export class DBModule { }

