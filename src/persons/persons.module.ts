import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsEntity } from 'src/entities/persons.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonsEntity])],
  providers: [PersonsService],
  controllers: [PersonsController]
})
export class PersonsModule {}
