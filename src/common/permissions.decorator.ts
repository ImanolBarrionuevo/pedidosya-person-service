import { SetMetadata } from '@nestjs/common';
import { Permissions } from './permissions.enum'

// Clave para almacenar metadatos de permisos
export const PERMISSIONS_KEY = 'permissions';

// Decorador personalizado que asigna permisos a controladores, utilizando SetMetaData para adjuntar el array al contexto de ejecución
export const PermissionsDecorator = (...permissions: Permissions[]) => SetMetadata(PERMISSIONS_KEY, permissions);