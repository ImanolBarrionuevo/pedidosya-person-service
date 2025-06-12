import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsEntity } from 'src/entities/persons.entity';
import { CitiesEntity } from 'src/entities/cities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonsEntity, CitiesEntity])],
  providers: [PersonsService],
  controllers: [PersonsController]
})
export class PersonsModule { }
