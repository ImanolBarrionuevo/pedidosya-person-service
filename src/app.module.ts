import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './persons/persons.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { entities } from './entities';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [PersonsModule, CitiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
