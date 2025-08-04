import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsEntity } from 'src/entities/persons.entity';
import { CitiesModule } from 'src/cities/cities.module';

@Module({
  imports: [TypeOrmModule.forFeature([PersonsEntity]), // Importamos entidades TypeORM para este módulo
  CitiesModule], // Importamos el módulo de ciudades para poder usar su servicio
  providers: [PersonsService], // Definimos los servicios que pueden ser inyectados en controladores y otros servicios.
  controllers: [PersonsController] // Definimos el controlador que maneja las rutas HTTP.
})
export class PersonsModule { }
