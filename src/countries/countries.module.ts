/**
 * Módulo de países para la API.
 * Configura el controlador, servicio y entidad de países, y los integra con TypeORM.
 */

import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CountriesEntity } from 'src/entities/countries.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CountriesEntity])], // Entidad de países para TypeORM
  providers: [CountriesService], // Servicios que pueden ser inyectados en controladores y otros servicios
  controllers: [CountriesController], // Controlador que maneja las rutas HTTP
  exports: [CountriesService] // Exporta el servicio para su uso en otros módulos
})
export class CountriesModule { }
