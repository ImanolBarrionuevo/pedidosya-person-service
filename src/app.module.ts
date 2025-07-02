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
  imports: [
    // Conexión a PostgreSQL con TypeORM
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    database: 'proyectodesarrollo',
    username: 'postgres',
    password: 'postgres',
    synchronize: true, // Genera y actualiza el esquema de la BD segun entidades definidas en el código
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
  }),
  // Inyecta automaticamente el repositorio de cada entidad a los servicios
  TypeOrmModule.forFeature(entities),
  // Modulos de la aplicación
  PersonsModule, CitiesModule, CountriesModule, ProvincesModule,

  // Cliente HTTP basado en axios configurado para comunicarse con el servicio de auth
  HttpModule.register({ 
    baseURL: 'http://localhost:3001/auth', 
    timeout: 3000 
  })],
  controllers: [AppController],
  providers: [AppService, {
      provide: APP_GUARD, // Token para aplicar un guard a todas las rutas de la aplicación
      useClass: PermissionsGuard, // Clase que implementa CanActivate y valida permisos
    }],
})
export class AppModule {}
