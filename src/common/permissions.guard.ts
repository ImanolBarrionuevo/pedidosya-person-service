/**
 * Guard de permisos para rutas y controladores en NestJS.
 * Verifica si el usuario tiene los permisos necesarios antes de permitir el acceso.
 * Lee los permisos requeridos con Reflector y valida el token mediante una petición HTTP.
 * Si faltan permisos o el token es inválido, lanza una excepción Forbidden.
 */

import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, // Reflector permite leer los permisos definidos en los endpoints
    private readonly http: HttpService, // HTTP permite realizar la petición de validación de permisos
  ) { }

  // Verifica si el usuario cuenta con los permisos necesarios para realizar una acción
  async canActivate(context: ExecutionContext): Promise<boolean> { // context es el contexto de ejecución de la petición (HTTP, métodos, etc.) 
    const requiredPerms = this.reflector.get<string[]>( // Obtiene los permisos requeridos, definidos en el endpoint
      PERMISSIONS_KEY,
      context.getHandler(),
    );
    if (!requiredPerms?.length) { // Si no hay permisos requeridos, permite el acceso
      return true;
    }

    const req = context.switchToHttp().getRequest(); // Obtiene la petición HTTP del contexto
    const authHeader = req.headers.authorization; // Obtiene el token de autorización del header
    if (!authHeader?.startsWith('Bearer ')) { // Verifica que incie con Bearer
      throw new ForbiddenException('Token de autorización requerido');
    }

    const token = authHeader.replace(/^Bearer\s+/i, ''); // Limpia el token de la cadena Bearer

    try { // Valida si el token tiene los permisos necesarios mediante una petición HTTP
      const response$ = this.http.post('/can-do', {
        token,
        permissions: requiredPerms,
      });
      const { data } = await firstValueFrom(response$);


      if (!data.allowed) {
        throw new ForbiddenException('Faltan permisos'); // Si no tiene permisos, lanza una excepción
      }
      return true; // Si tiene permisos, retorna true
    } catch (err) {
      throw new ForbiddenException('Error validando permisos'); // Cualquier error en la validación retorna un error
    }
  }
}