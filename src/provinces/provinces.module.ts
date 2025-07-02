import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';
import { ProvincesEntity } from 'src/entities/provinces.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesEntity } from 'src/entities/countries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProvincesEntity, CountriesEntity])], // Importamos entidades TypeORM para este módulo
  providers: [ProvincesService], // Definimos los servicios que pueden ser inyectados en controladores y otros servicios.
  controllers: [ProvincesController] // Definimos el controlador que maneja las rutas HTTP.
})
export class ProvincesModule { }
