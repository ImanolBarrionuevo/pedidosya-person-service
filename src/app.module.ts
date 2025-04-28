import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './persons/persons.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { entities } from './entities';

@Module({
  imports: [PersonsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
