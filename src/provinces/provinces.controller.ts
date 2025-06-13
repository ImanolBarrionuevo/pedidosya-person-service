import { Controller, Param, Body, Post, Get, Put, Patch, Delete, Query } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/patch-province.dto';
import { PaginationDto } from 'src/dto/pagination.dto';

@Controller('province')
export class ProvincesController {

    constructor(private provincesService: ProvincesService) { }

    @Post()
    postProvince(@Body() province: CreateProvinceDto) {
        return this.provincesService.createProvince(province)
    }

    @Get()
    getCities(@Query() paginationDto: PaginationDto) {
        return this.provincesService.findProvinces(paginationDto)
    }

    @Get(':id')
    getProvince(@Param('id') id: number) {
        return this.provincesService.findProvince(id)
    }

    @Put(':id')
    putProvince(@Param('id') id: number, @Body() updateProvince: CreateProvinceDto) {
        return this.provincesService.updateProvince(id, updateProvince)
    }

    @Patch(':id')
    patchProvince(@Param('id') id: number, @Body() updateProvince: UpdateProvinceDto) {
        return this.provincesService.partialUpdateProvince(id, updateProvince)
    }

    @Delete(':id')
    deleteProvince(@Param('id') id: number) {
        return this.provincesService.deleteProvince(id)
    }

}
