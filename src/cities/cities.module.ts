/**
 * Módulo de ciudades para la API.
 * Configura el controlador, servicio y entidad de ciudades, e integra TypeORM con el módulo de provincias.
 */

import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CitiesEntity } from 'src/entities/cities.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvincesModule } from 'src/provinces/provinces.module';

@Module({
  imports: [TypeOrmModule.forFeature([CitiesEntity]), // Entidad de ciudades para TypeORM
    ProvincesModule], // Importa el módulo de provincias para usar su servicio
  providers: [CitiesService], // Servicios que pueden ser inyectados en controladores y otros servicios
  controllers: [CitiesController], // Controlador que maneja las rutas HTTP.
  exports: [CitiesService] // Exporta el servicio para su uso en otros módulos.
})
export class CitiesModule { }
