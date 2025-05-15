import { Body, Controller, Get, Param, Post, Put, Patch, Delete, Query } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/patch-person.dto';
import { PaginationDto } from './dto/pagination-person.dto';

@Controller('person')
export class PersonsController {

    constructor(private personsService: PersonsService){}

    @Post()
    postPerson(@Body() createPersonDto:CreatePersonDto){
        return this.personsService.createPerson(createPersonDto)  
    }

    @Get()
    getCities(@Query() paginationDto: PaginationDto){
        return this.personsService.findPersons(paginationDto)
    }

    @Get(':id')
    getPerson(@Param('id') idPerson:number){
        return this.personsService.findPerson(idPerson)
    }

    @Put(':id')
    putPerson(@Param('id') idPerson:number, @Body() updatePerson:CreatePersonDto){
        return this.personsService.updatePerson(idPerson, updatePerson)
    }

    @Patch(':id')
    patchPerson(@Param('id') idPerson:number, @Body()partialUpdatePerson:UpdatePersonDto){
        return this.personsService.partialUpdatePerson(idPerson, partialUpdatePerson)
    }

    @Delete(':id')
    deletePerson(@Param('id') idPerson:number){
        return this.personsService.deletePerson(idPerson)
    }
    
}
