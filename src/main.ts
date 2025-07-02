import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Crea la aplicación Nest usando AppModule como módulo raíz
  const app = await NestFactory.create(AppModule);
  // Habilita CORS para aceptar peticiones desde otros lugares
  app.enableCors();
  // Aplica la ValidationPipe globalmente
  app.useGlobalPipes(new ValidationPipe());
  // Inicia el servidor en el puerto definido o en 3000 por defecto
  await app.listen(process.env.PORT ?? 3000);
}

// Ejecuta la función de arranque
bootstrap();