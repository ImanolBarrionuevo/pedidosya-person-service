import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CitiesEntity } from 'src/entities/cities.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvincesModule } from 'src/provinces/provinces.module';

@Module({
  imports: [TypeOrmModule.forFeature([CitiesEntity]), // Importamos entidades TypeORM para este módulo 
  ProvincesModule], // Importamos el módulo de provincias para poder usar su servicio
  providers: [CitiesService], // Definimos los servicios que pueden ser inyectados en controladores y otros servicios.
  controllers: [CitiesController], // Definimos el controlador que maneja las rutas HTTP.
  exports: [CitiesService] // Exportamos el servicio para que pueda ser utilizado en otros módulos.
})
export class CitiesModule { }
