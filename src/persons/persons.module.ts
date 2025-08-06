/**
 * Módulo de personas para la API.
 * Configura el controlador, servicio y entidad de personas, e integra TypeORM con el módulo de ciudades.
 */

import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsEntity } from 'src/entities/persons.entity';
import { CitiesModule } from 'src/cities/cities.module';

@Module({
  imports: [TypeOrmModule.forFeature([PersonsEntity]), // Entidad de personas para TypeORM
    CitiesModule], // Importa el módulo de ciudades para usar su servicio
  providers: [PersonsService], // Servicios que pueden ser inyectados en controladores y otros servicios
  controllers: [PersonsController] // Controlador que maneja las rutas HTTP
})
export class PersonsModule { }
