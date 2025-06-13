import { Controller, Param, Body, Post, Get, Put, Patch, Delete, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/patch-city.dto';
import { PaginationDto } from 'src/dto/pagination.dto';


@Controller('city')
export class CitiesController {

    constructor(private citiesService: CitiesService) { }

    @Post()
    postCity(@Body() city: CreateCityDto) {
        return this.citiesService.createCity(city)
    }

    @Get()
    getCities(@Query() paginationDto: PaginationDto) {
        return this.citiesService.findCities(paginationDto)
    }

    @Get(':id')
    getCity(@Param('id') id: number) {
        return this.citiesService.findCity(id)
    }

    @Put(':id')
    putCity(@Param('id') id: number, @Body() updateCity: CreateCityDto) {
        return this.citiesService.updateCity(id, updateCity)
    }

    @Patch(':id')
    patchCity(@Param('id') id: number, @Body() updateCity: UpdateCityDto) {
        return this.citiesService.partialUpdateCity(id, updateCity)
    }

    @Delete(':id')
    deleteCity(@Param('id') id: number) {
        return this.citiesService.deleteCity(id)
    }

}
