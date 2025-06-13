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
    private readonly reflector: Reflector,
    private readonly http: HttpService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1) Metadatos de permisos en la ruta
    const requiredPerms = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );
    if (!requiredPerms?.length) {
      // Si no hay permisos definidos, dejamos pasar
      return true;
    }

    // 2) Extraer token del header
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new ForbiddenException('Token de autorización requerido');
    }
    const token = authHeader.replace(/^Bearer\s+/i, '');

    // 3) Llamar al Auth Service por medio de /can‑do
    try {
      const response$ = this.http.post('/can-do', {
        token,
        permissions: requiredPerms,
      });
      const { data } = await firstValueFrom(response$);

      if (!data.allowed) {
        throw new ForbiddenException(
          `Acceso denegado: faltan permisos [${requiredPerms.join(', ')}]`,
        );
      }
      return true;
    } catch (err) {
      throw new ForbiddenException('Error validando permisos');
    }
  }
}