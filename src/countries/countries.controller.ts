import { Body, Param, Controller, Post, Get, Put, Patch, Delete, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { PaginationDto } from './dto/pagination-country.dto';

@Controller('country')
export class CountriesController {

    constructor(private countriesService: CountriesService){}

    @Post()
    postCountries(@Body() country:CreateCountryDto){
        return this.countriesService.createCountry(country)
    }

    @Get()
    getCities(@Query() paginationDto: PaginationDto){
        return this.countriesService.findCities(paginationDto)
    }

    @Get()
    getAllCountries(){
        return this.countriesService.findAllCountries()
    }

    @Get(':id')
    getCountry(@Param('id') idCountry:number){
        return this.countriesService.findCountry(idCountry)
    }

    @Put(':id')
    putCountry(@Param('id') id:number, @Body() updateCountry: CreateCountryDto){
        return this.countriesService.updateCountry(id, updateCountry)
    }

    @Patch(':id')
    patchCountry(@Param('id') id:number, @Body() updateCountry: CreateCountryDto){
        return this.countriesService.updateCountry(id, updateCountry)
    }

    @Delete(':id')
    deleteCountry(@Param('id') id:number){
        return this.countriesService.deleteCountry(id)
    }

}
