import { Controller, Param, Body, Post, Get, Put, Patch, Delete, Query } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/patch-province.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Permissions } from 'src/common/permissions.enum';
import { PermissionsDecorator } from 'src/common/permissions.decorator';

@Controller('province')
export class ProvincesController {

    // Inyectamos el servicio de provincia
    constructor(private provincesService: ProvincesService) { }

    // Creamos una provincia
    @Post()
    @PermissionsDecorator(Permissions.CreateProvince)
    postProvince(@Body() province: CreateProvinceDto) {
        return this.provincesService.createProvince(province)
    }

    // Obtenemos todos las provincias
    @Get()
    @PermissionsDecorator(Permissions.ReadProvince)
    getProvinces(@Query() paginationDto: PaginationDto) {
        return this.provincesService.findProvinces(paginationDto)
    }

    // Obtenemos una provincia especifica
    @Get(':id')
    @PermissionsDecorator(Permissions.ReadProvince)
    getProvince(@Param('id') id: number) {
        return this.provincesService.findProvince(id)
    }

    // Actualizamos una provincia
    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyProvince)
    putProvince(@Param('id') id: number, @Body() updateProvince: CreateProvinceDto) {
        return this.provincesService.updateProvince(id, updateProvince)
    }

    // Actualizamos parcialmente una provincia
    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyProvince)
    patchProvince(@Param('id') id: number, @Body() updateProvince: UpdateProvinceDto) {
        return this.provincesService.partialUpdateProvince(id, updateProvince)
    }

    // Eliminamos una provincia por id
    @Delete(':id')
    @PermissionsDecorator(Permissions.DeleteProvince)
    deleteProvince(@Param('id') id: number) {
        return this.provincesService.deleteProvince(id)
    }

}
