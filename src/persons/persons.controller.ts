/**
 * Controlador de personas para la API.
 * Expone endpoints para crear, leer, actualizar y eliminar personas.
 * Cada endpoint verifica los permisos necesarios mediante el decorador personalizado.
 */

import { Body, Controller, Get, Param, Post, Put, Patch, Delete, Query } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/patch-person.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PermissionsDecorator } from 'src/common/permissions.decorator';
import { Permissions } from 'src/common/permissions.enum';

@Controller('person')
export class PersonsController {

    // Inyecta el servicio de personas
    constructor(private personsService: PersonsService) { }

    // Crea una nueva persona // Permiso: CREATE_PERSON
    @Post()
    @PermissionsDecorator(Permissions.CreatePerson)
    postPerson(@Body() createPersonDto: CreatePersonDto) {
        return this.personsService.createPerson(createPersonDto)
    }

    // Obtiene todas las personas, con paginación // Permiso: READ_PERSON
    @Get()
    @PermissionsDecorator(Permissions.ReadPerson)
    getPersons(@Query() paginationDto: PaginationDto) {
        return this.personsService.findPersons(paginationDto)
    }

    // Obtiene una persona específica por ID // Permiso: READ_PERSON
    @Get(':id')
    @PermissionsDecorator(Permissions.ReadPerson)
    getPerson(@Param('id') idPerson: number) {
        return this.personsService.findPerson(idPerson)
    }

    // Actualiza completamente una persona por ID // Permiso: MODIFY_PERSON
    @Put(':id')
    @PermissionsDecorator(Permissions.ModifyPerson)
    putPerson(@Param('id') idPerson: number, @Body() updatePerson: CreatePersonDto) {
        return this.personsService.updatePerson(idPerson, updatePerson)
    }

    // Actualiza parcialmente una persona por ID // Permiso: MODIFY_PERSON
    @Patch(':id')
    @PermissionsDecorator(Permissions.ModifyPerson)
    patchPerson(@Param('id') idPerson: number, @Body() partialUpdatePerson: UpdatePersonDto) {
        return this.personsService.partialUpdatePerson(idPerson, partialUpdatePerson)
    }

    // Elimina una persona por ID // Permiso: DELETE_PERSON
    @Delete(':id')
    @PermissionsDecorator(Permissions.DeletePerson)
    deletePerson(@Param('id') idPerson: number) {
        return this.personsService.deletePerson(idPerson)
    }

}
