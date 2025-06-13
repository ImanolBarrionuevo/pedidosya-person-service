import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './persons/persons.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { entities } from './entities';
import { CitiesModule } from './cities/cities.module';
import { CountriesModule } from './countries/countries.module';
import { ProvincesModule } from './provinces/provinces.module';
import { HttpModule } from '@nestjs/axios';
import { PermissionsGuard } from './common/permissions.guard';
import { APP_GUARD } from '@nestjs/core';



@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    database: 'proyectodesarrollo',
    username: 'postgres',
    password: 'postgres',
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
  }),
  TypeOrmModule.forFeature(entities),
  PersonsModule, CitiesModule, CountriesModule, ProvincesModule,
  HttpModule.register({ 
    baseURL: 'http://auth:3001', 
    timeout: 3000 
  })],
  controllers: [AppController],
  providers: [AppService, {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    }],
})
export class AppModule {}
