import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';
import { ProvincesEntity } from 'src/entities/provinces.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesEntity } from 'src/entities/countries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProvincesEntity, CountriesEntity])],
  providers: [ProvincesService],
  controllers: [ProvincesController]
})
export class ProvincesModule { }
