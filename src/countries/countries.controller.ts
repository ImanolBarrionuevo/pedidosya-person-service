import { Body, Param, Controller, Post, Get, Put, Patch, Delete, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Permissions } from 'src/common/permissions.enum';
import { PermissionsDecorator } from 'src/common/permissions.decorator';

@Controller('country')
export class CountriesController {

    constructor(private countriesService: CountriesService) { }

    @Post()
    @PermissionsDecorator(Permissions.CreateCountry)
    postCountries(@Body() country: CreateCountryDto) {
        return this.countriesService.createCountry(country)
    }

    @Get()
    @PermissionsDecorator(Permissions.ReadCountry)
    getCities(@Query() paginationDto: PaginationDto) {
        return this.countriesService.findCities(paginationDto)
    }

    @Get(':id')
    @PermissionsDecorator(Permissions.ReadCountry)
    getCountry(@Param('id') idCountry: number) {
        return this.countriesService.findCountry(idCountry)
    }

    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyCountry)
    putCountry(@Param('id') id: number, @Body() updateCountry: CreateCountryDto) {
        return this.countriesService.updateCountry(id, updateCountry)
    }

    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyCountry)
    patchCountry(@Param('id') id: number, @Body() updateCountry: CreateCountryDto) {
        return this.countriesService.updateCountry(id, updateCountry)
    }

    @Delete(':id')
    @PermissionsDecorator(Permissions.DeleteCountry)
    deleteCountry(@Param('id') id: number) {
        return this.countriesService.deleteCountry(id)
    }

}
