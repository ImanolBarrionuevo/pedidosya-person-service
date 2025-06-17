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
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Obtenemos los permisos requeridos definidos en el endpoint
    const requiredPerms = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );
    if (!requiredPerms?.length) {
      return true;
    }

    //Obtenemos request y validamos existencia del token
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new ForbiddenException('Token de autorización requerido');
    }

    const token = authHeader.replace(/^Bearer\s+/i, '');

    //Validamos si el token tiene los permisos necesarios
    try {
      const response$ = this.http.post('/can-do', {
        token,
        permissions: requiredPerms,
      });
      const { data } = await firstValueFrom(response$);

      if (!data.allowed) {
        throw new ForbiddenException('Faltan permisos');
      }
      return true;
    } catch (err) {
      throw new ForbiddenException('Error validando permisos');
    }
  }
}