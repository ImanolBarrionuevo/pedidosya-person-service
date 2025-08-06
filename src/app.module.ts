/**
 * Módulo principal de la aplicación.
 * Configura la conexión con PostgreSQL mediante TypeORM, integra los módulos de dominio (personas, ciudades, países, provincias),
 * registra un cliente HTTP para autenticación, y aplica un guard de permisos a todas las rutas.
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './persons/persons.module';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      synchronize: true, // Genera y actualiza el esquema de la BD segun las entidades del código
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    TypeOrmModule.forFeature(entities), // Inyección automática de repositorios para las entidades
    PersonsModule, CitiesModule, CountriesModule, ProvincesModule,  // Módulos de dominio de la aplicación

    HttpModule.register({ // Cliente HTTP configurado para comunicarse con el servicio de auth
      baseURL: 'http://localhost:3001/auth',
      timeout: 3000
    })
  ],
  controllers: [AppController], // Controlador principal de la aplicación
  providers: [AppService, // Servicio principal
    {
      provide: APP_GUARD, // Token para aplicar un guard de permisos a todas las rutas
      useClass: PermissionsGuard, // Clase que implementa lógica de autorización con CanActivate
    }
  ],
})
export class AppModule { }
