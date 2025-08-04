import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CountriesEntity } from 'src/entities/countries.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CountriesEntity])], // Importamos entidades TypeORM para este módulo 
  providers: [CountriesService], // Definimos los servicios que pueden ser inyectados en controladores y otros servicios.
  controllers: [CountriesController], // Definimos el controlador que maneja las rutas HTTP.
  exports: [CountriesService] // Exportamos el servicio para que pueda ser utilizado en otros módulos.
})
export class CountriesModule {}
