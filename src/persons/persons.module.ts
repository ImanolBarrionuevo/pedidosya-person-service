import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsEntity } from 'src/entities/persons.entity';
import { CitiesEntity } from 'src/entities/cities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonsEntity, CitiesEntity])], // Importamos entidades TypeORM para este módulo
  providers: [PersonsService], // Definimos los servicios que pueden ser inyectados en controladores y otros servicios.
  controllers: [PersonsController] // Definimos el controlador que maneja las rutas HTTP.
})
export class PersonsModule { }
