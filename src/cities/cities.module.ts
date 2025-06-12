import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CitiesEntity } from 'src/entities/cities.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvincesEntity } from 'src/entities/provinces.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CitiesEntity, ProvincesEntity])],
  providers: [CitiesService],
  controllers: [CitiesController]
})
export class CitiesModule { }
