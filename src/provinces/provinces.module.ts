import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';
import { ProvincesEntity } from 'src/entities/provinces.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from 'src/countries/countries.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProvincesEntity]), // Importamos entidades TypeORM para este módulo
  CountriesModule], // Importamos el módulo de países para poder usar su servicio
  providers: [ProvincesService], // Definimos los servicios que pueden ser inyectados en controladores y otros servicios.
  controllers: [ProvincesController], // Definimos el controlador que maneja las rutas HTTP.
  exports: [ProvincesService] // Exportamos el servicio para que pueda ser utilizado en otros módulos.
})
export class ProvincesModule { }
