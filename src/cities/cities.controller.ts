import { Controller, Param, Body, Post, Get, Put, Patch, Delete, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/patch-city.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Permissions } from 'src/common/permissions.enum';
import { PermissionsDecorator } from 'src/common/permissions.decorator';

@Controller('city')
export class CitiesController {

    constructor(private citiesService: CitiesService) { }

    @Post()
    @PermissionsDecorator(Permissions.CreateCity)
    postCity(@Body() city: CreateCityDto) {
        return this.citiesService.createCity(city)
    }

    @Get()
    @PermissionsDecorator(Permissions.ReadCity)
    getCities(@Query() paginationDto: PaginationDto) {
        return this.citiesService.findCities(paginationDto)
    }

    @Get(':id')
    @PermissionsDecorator(Permissions.ReadCity)
    getCity(@Param('id') id: number) {
        return this.citiesService.findCity(id)
    }

    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyCity)
    putCity(@Param('id') id: number, @Body() updateCity: CreateCityDto) {
        return this.citiesService.updateCity(id, updateCity)
    }

    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyCity)
    patchCity(@Param('id') id: number, @Body() updateCity: UpdateCityDto) {
        return this.citiesService.partialUpdateCity(id, updateCity)
    }

    @Delete(':id')
    @PermissionsDecorator(Permissions.DeleteCity)
    deleteCity(@Param('id') id: number) {
        return this.citiesService.deleteCity(id)
    }

}
