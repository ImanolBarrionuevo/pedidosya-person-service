import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CityEntity } from 'src/entities/cities.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  providers: [CitiesService],
  controllers: [CitiesController]
})
export class CitiesModule {}
