import { Body, Controller, Get, Param, Post, Put, Patch, Delete, Query } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/patch-person.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PermissionsDecorator } from 'src/common/permissions.decorator';
import { Permissions } from 'src/common/permissions.enum';

@Controller('person')
export class PersonsController {

    // Inyectamos el servicio de persona
    constructor(private personsService: PersonsService) { }

    // Creamos una persona
    @Post()
    @PermissionsDecorator(Permissions.CreatePerson)
    postPerson(@Body() createPersonDto: CreatePersonDto) {
        return this.personsService.createPerson(createPersonDto)
    }

    // Obtenemos todos las personas
    @Get()
    @PermissionsDecorator(Permissions.ReadPerson)
    getPersons(@Query() paginationDto: PaginationDto) {
        return this.personsService.findPersons(paginationDto)
    }

    // Obtenemos una persona especifica
    @Get(':id')
    @PermissionsDecorator(Permissions.ReadPerson)
    getPerson(@Param('id') idPerson: number) {
        return this.personsService.findPerson(idPerson)
    }

    // Actualizamos una persona
    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyPerson)
    putPerson(@Param('id') idPerson: number, @Body() updatePerson: CreatePersonDto) {
        return this.personsService.updatePerson(idPerson, updatePerson)
    }

    // Actualizamos parcialmente una persona
    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyPerson)
    patchPerson(@Param('id') idPerson: number, @Body() partialUpdatePerson: UpdatePersonDto) {
        return this.personsService.partialUpdatePerson(idPerson, partialUpdatePerson)
    }

    // Eliminamos una persona por id
    @Delete(':id')
    @PermissionsDecorator(Permissions.DeletePerson)
    deletePerson(@Param('id') idPerson: number) {
        return this.personsService.deletePerson(idPerson)
    }

}
