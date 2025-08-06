/**
 * Controlador de ciudades para la API.
 * Expone endpoints para crear, leer, actualizar y eliminar ciudades.
 * Cada endpoint verifica los permisos necesarios mediante el decorador personalizado.
 */

import { Controller, Param, Body, Post, Get, Put, Patch, Delete, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/patch-city.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Permissions } from 'src/common/permissions.enum';
import { PermissionsDecorator } from 'src/common/permissions.decorator';

@Controller('city')
export class CitiesController {

    // Inyecta el servicio de ciudades
    constructor(private citiesService: CitiesService) { }

    // Crea una nueva ciudad // Permiso: CREATE_CITY
    @Post()
    @PermissionsDecorator(Permissions.CreateCity)
    postCity(@Body() city: CreateCityDto) {
        return this.citiesService.createCity(city)
    }

    // Obtiene todas las ciudades, con paginación // Permiso: READ_CITY
    @Get()
    @PermissionsDecorator(Permissions.ReadCity)
    getCities(@Query() paginationDto: PaginationDto) {
        return this.citiesService.findCities(paginationDto)
    }

    // Obtiene una ciudad específica por ID // Permiso: READ_CITY
    @Get(':id')
    @PermissionsDecorator(Permissions.ReadCity)
    getCity(@Param('id') id: number) {
        return this.citiesService.findCity(id)
    }

    // Actualiza una ciudad completamente por ID // Permiso: MODIFY_CITY
    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyCity)
    putCity(@Param('id') id: number, @Body() updateCity: CreateCityDto) {
        return this.citiesService.updateCity(id, updateCity)
    }

    // Actualiza parcialmente una ciudad por ID // Permiso: MODIFY_CITY
    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyCity)
    patchCity(@Param('id') id: number, @Body() updateCity: UpdateCityDto) {
        return this.citiesService.partialUpdateCity(id, updateCity)
    }

    // Elimina una ciudad por ID // Permiso: DELETE_CITY
    @Delete(':id')
    @PermissionsDecorator(Permissions.DeleteCity)
    deleteCity(@Param('id') id: number) {
        return this.citiesService.deleteCity(id)
    }

}
