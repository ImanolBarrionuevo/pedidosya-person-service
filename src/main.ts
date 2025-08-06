/**
 * Punto de entrada principal de la aplicación NestJS.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Crea la aplicación Nest usando AppModule como módulo raíz
  app.enableCors(); // Habilita CORS para aceptar peticiones desde otros lugares
  app.useGlobalPipes(new ValidationPipe()); // Aplica la ValidationPipe globalmente
  await app.listen(process.env.PORT ?? 3000); // Inicia el servidor en el puerto definido o en 3000 por defecto
}

bootstrap(); // Ejecuta la función de arranque