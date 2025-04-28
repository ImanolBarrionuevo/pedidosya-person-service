import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { CitiesModule } from 'src/cities/cities.module';

@Module({
  imports: [CitiesModule],
  providers: [PersonsService],
  controllers: [PersonsController]
})
export class PersonsModule {}
