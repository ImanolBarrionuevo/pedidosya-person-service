import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CountriesEntity } from 'src/entities/countries.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CountriesEntity])],
  providers: [CountriesService],
  controllers: [CountriesController]
})
export class CountriesModule {}
