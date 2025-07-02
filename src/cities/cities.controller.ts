import { Controller, Param, Body, Post, Get, Put, Patch, Delete, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/patch-city.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Permissions } from 'src/common/permissions.enum';
import { PermissionsDecorator } from 'src/common/permissions.decorator';

@Controller('city')
export class CitiesController {

    // Inyectamos el servicio de ciudad
    constructor(private citiesService: CitiesService) { }

    // Creamos una ciudad
    @Post()
    @PermissionsDecorator(Permissions.CreateCity) // Verificamos si tiene permiso necesario
    postCity(@Body() city: CreateCityDto) {
        return this.citiesService.createCity(city)
    }

    // Obtenemos todas las ciudades
    @Get()
    @PermissionsDecorator(Permissions.ReadCity) // Verificamos si tiene permiso necesario
    getCities(@Query() paginationDto: PaginationDto) {
        return this.citiesService.findCities(paginationDto)
    }

    // Obtenemos una ciudad especifica
    @Get(':id')
    @PermissionsDecorator(Permissions.ReadCity) // Verificamos si tiene permiso necesario
    getCity(@Param('id') id: number) {
        return this.citiesService.findCity(id)
    }

    // Actualizamos una ciudad
    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyCity) // Verificamos si tiene permiso necesario
    putCity(@Param('id') id: number, @Body() updateCity: CreateCityDto) {
        return this.citiesService.updateCity(id, updateCity)
    }

    // Actualizamos parcialmente una ciudad
    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyCity) // Verificamos si tiene permiso necesario
    patchCity(@Param('id') id: number, @Body() updateCity: UpdateCityDto) {
        return this.citiesService.partialUpdateCity(id, updateCity)
    }

    // Eliminamos una ciudad por id
    @Delete(':id')
    @PermissionsDecorator(Permissions.DeleteCity) // Verificamos si tiene permiso necesario
    deleteCity(@Param('id') id: number) {
        return this.citiesService.deleteCity(id)
    }

}
