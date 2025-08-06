/**
 * Módulo de provincias para la API.
 * Configura el controlador, servicio y entidad de provincias, y los integra con TypeORM y el módulo de países.
 */

import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';
import { ProvincesEntity } from 'src/entities/provinces.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from 'src/countries/countries.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProvincesEntity]), // Entidad de provincias para TypeORM
    CountriesModule // Importa el módulo de países para usar su servicio
  ],
  providers: [ProvincesService], // Servicios que pueden ser inyectados en controladores y otros servicios
  controllers: [ProvincesController], // Controlador que maneja las rutas HTTP
  exports: [ProvincesService] // Exporta el servicio para su uso en otros módulos
})
export class ProvincesModule { }
