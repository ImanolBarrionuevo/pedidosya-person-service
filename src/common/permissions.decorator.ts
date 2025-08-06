/**
 * Decorador personalizado para asignar permisos a rutas y controladores en NestJS.
 * Utiliza SetMetadata para adjuntar los permisos requeridos al contexto de ejecución.
 */

import { SetMetadata } from '@nestjs/common';
import { Permissions } from './permissions.enum'

export const PERMISSIONS_KEY = 'permissions'; // Clave para almacenar metadatos de permisos

// Decorador que asigna permisos a controladores y utiliza SetMetaData para adjuntar el array al contexto de ejecución
export const PermissionsDecorator = (...permissions: Permissions[]) => SetMetadata(PERMISSIONS_KEY, permissions);