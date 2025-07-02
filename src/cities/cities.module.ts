import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CitiesEntity } from 'src/entities/cities.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvincesEntity } from 'src/entities/provinces.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CitiesEntity, ProvincesEntity])], // Importamos entidades TypeORM para este módulo 
  providers: [CitiesService], // Definimos los servicios que pueden ser inyectados en controladores y otros servicios.
  controllers: [CitiesController] // Definimos el controlador que maneja las rutas HTTP.
})
export class CitiesModule { }
