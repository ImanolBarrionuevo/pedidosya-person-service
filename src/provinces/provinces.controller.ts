/**
 * Controlador de provincias para la API.
 * Expone endpoints para crear, leer, actualizar y eliminar provincias.
 * Cada endpoint verifica los permisos necesarios mediante el decorador personalizado.
 */

import { Controller, Param, Body, Post, Get, Put, Patch, Delete, Query } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/patch-province.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Permissions } from 'src/common/permissions.enum';
import { PermissionsDecorator } from 'src/common/permissions.decorator';

@Controller('province')
export class ProvincesController {

    // Inyecta el servicio de provincias
    constructor(private provincesService: ProvincesService) { }

    // Crea una nueva provincia // Permiso: CREATE_PROVINCE
    @Post()
    @PermissionsDecorator(Permissions.CreateProvince)
    postProvince(@Body() province: CreateProvinceDto) {
        return this.provincesService.createProvince(province)
    }

    // Obtiene todas las provincias, con paginación // Permiso: READ_PROVINCE
    @Get()
    @PermissionsDecorator(Permissions.ReadProvince)
    getProvinces(@Query() paginationDto: PaginationDto) {
        return this.provincesService.findProvinces(paginationDto)
    }

    // Obtiene una provincia específica por ID // Permiso: READ_PROVINCE
    @Get(':id')
    @PermissionsDecorator(Permissions.ReadProvince)
    getProvince(@Param('id') id: number) {
        return this.provincesService.findProvince(id)
    }

    // Actualiza completamente una provincia por ID // Permiso: MODIFY_PROVINCE
    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyProvince)
    putProvince(@Param('id') id: number, @Body() updateProvince: CreateProvinceDto) {
        return this.provincesService.updateProvince(id, updateProvince)
    }

    // Actualiza parcialmente una provincia por ID // Permiso: MODIFY_PROVINCE
    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyProvince)
    patchProvince(@Param('id') id: number, @Body() updateProvince: UpdateProvinceDto) {
        return this.provincesService.partialUpdateProvince(id, updateProvince)
    }

    // Elimina una provincia por ID // Permiso: DELETE_PROVINCE
    @Delete(':id')
    @PermissionsDecorator(Permissions.DeleteProvince)
    deleteProvince(@Param('id') id: number) {
        return this.provincesService.deleteProvince(id)
    }

}
