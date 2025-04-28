import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';

@Module({
  providers: [PersonsService],
  controllers: [PersonsController]
})
export class PersonsModule {}
