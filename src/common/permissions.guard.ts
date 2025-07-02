import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, // Usamos reflector para leer permisos asociados en SetMetaData
    private readonly http: HttpService, // Usamos http para realizar la petición de validación de permisos
  ) { }

  // Verificamos si se cuenta con los permisos necesarios para realizar una acción
  async canActivate(context: ExecutionContext): Promise<boolean> { // Le pasamos el contexto de la ejecución (HTTP, métodos, entre otros) 
    // Obtenemos los permisos que se requieren, definidos en el endpoint
    const requiredPerms = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );
    // Si no hay permisos requeridos, dejamos pasar la petición
    if (!requiredPerms?.length) {
      return true;
    }

    // Obtenemos la petición HTTP
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization; // Obtenemos el token de autorización
    // Verificamos que arranque con Bearer
    if (!authHeader?.startsWith('Bearer ')) {
      throw new ForbiddenException('Token de autorización requerido');
    }

    // Obtenemos el token limpio
    const token = authHeader.replace(/^Bearer\s+/i, '');

    // Validamos si el token tiene los permisos necesarios
    try {
      const response$ = this.http.post('/can-do', {
        token,
        permissions: requiredPerms,
      });
      const { data } = await firstValueFrom(response$);

      // Si no tiene permisos, lanzamos excepción
      if (!data.allowed) {
        throw new ForbiddenException('Faltan permisos');
      }

      // Si tiene permisos, retornamos true
      return true;
    } catch (err) {
      // Cualquier error en la validación, retorna un error
      throw new ForbiddenException('Error validando permisos');
    }
  }
}