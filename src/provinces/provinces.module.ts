import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';
import { ProvinceEntity } from 'src/entities/provinces.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProvinceEntity])],
  providers: [ProvincesService],
  controllers: [ProvincesController]
})
export class ProvincesModule {}
