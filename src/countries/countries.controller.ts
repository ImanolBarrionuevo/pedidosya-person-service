/**
 * Controlador de países para la API.
 * Expone endpoints para crear, leer, actualizar y eliminar países.
 * Cada endpoint verifica los permisos necesarios mediante el decorador personalizado.
 */

import { Body, Param, Controller, Post, Get, Put, Patch, Delete, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Permissions } from 'src/common/permissions.enum';
import { PermissionsDecorator } from 'src/common/permissions.decorator';

@Controller('country')
export class CountriesController {

    // Inyecta el servicio de paises
    constructor(private countriesService: CountriesService) { }

    // Crea una nueva ciudad // Permiso: CREATE_CITY
    @Post()
    @PermissionsDecorator(Permissions.CreateCountry)
    postCountries(@Body() country: CreateCountryDto) {
        return this.countriesService.createCountry(country)
    }

    // Obtiene todos los países, con paginación // Permiso: READ_COUNTRY
    @Get()
    @PermissionsDecorator(Permissions.ReadCountry)
    getCountries(@Query() paginationDto: PaginationDto) {
        return this.countriesService.findCountries(paginationDto)
    }

    // Obtiene un país específico por ID // Permiso: READ_COUNTRY
    @Get(':id')
    @PermissionsDecorator(Permissions.ReadCountry)
    getCountry(@Param('id') idCountry: number) {
        return this.countriesService.findCountry(idCountry)
    }

    // Actualiza completamente un país por ID // Permiso: MODIFY_COUNTRY
    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyCountry)
    putCountry(@Param('id') id: number, @Body() updateCountry: CreateCountryDto) {
        return this.countriesService.updateCountry(id, updateCountry)
    }

    // Actualiza parcialmente un país por ID // Permiso: MODIFY_COUNTRY
    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyCountry)
    patchCountry(@Param('id') id: number, @Body() updateCountry: CreateCountryDto) {
        return this.countriesService.updateCountry(id, updateCountry)
    }

    // Elimina un país por ID // Permiso: DELETE_COUNTRY
    @Delete(':id')
    @PermissionsDecorator(Permissions.DeleteCountry)
    deleteCountry(@Param('id') id: number) {
        return this.countriesService.deleteCountry(id)
    }

}
