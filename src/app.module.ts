import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './persons/persons.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { entities } from './entities';
import { CitiesModule } from './cities/cities.module';
import { CityEntity } from './entities/cities.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    database: 'proyectodesarrollo',
    username: 'postgres',
    password: 'postgres',
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
  }),
  TypeOrmModule.forFeature(entities),
  PersonsModule, CitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
