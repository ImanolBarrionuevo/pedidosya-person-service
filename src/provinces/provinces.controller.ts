import { Controller, Param, Body, Post, Get, Put, Patch, Delete, Query } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/patch-province.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Permissions } from 'src/common/permissions.enum';
import { PermissionsDecorator } from 'src/common/permissions.decorator';

@Controller('province')
export class ProvincesController {

    constructor(private provincesService: ProvincesService) { }

    @Post()
    @PermissionsDecorator(Permissions.CreateProvince)
    postProvince(@Body() province: CreateProvinceDto) {
        return this.provincesService.createProvince(province)
    }

    @Get()
    @PermissionsDecorator(Permissions.ReadProvince)
    getCities(@Query() paginationDto: PaginationDto) {
        return this.provincesService.findProvinces(paginationDto)
    }

    @Get(':id')
    @PermissionsDecorator(Permissions.ReadProvince)
    getProvince(@Param('id') id: number) {
        return this.provincesService.findProvince(id)
    }

    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyProvince)
    putProvince(@Param('id') id: number, @Body() updateProvince: CreateProvinceDto) {
        return this.provincesService.updateProvince(id, updateProvince)
    }

    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyProvince)
    patchProvince(@Param('id') id: number, @Body() updateProvince: UpdateProvinceDto) {
        return this.provincesService.partialUpdateProvince(id, updateProvince)
    }

    @Delete(':id')
    @PermissionsDecorator(Permissions.DeleteProvince)
    deleteProvince(@Param('id') id: number) {
        return this.provincesService.deleteProvince(id)
    }

}
