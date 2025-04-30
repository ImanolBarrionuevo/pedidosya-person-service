import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './create-person.dto';

@Controller('persons')
export class PersonsController {

    constructor(private personsService: PersonsService){}

    @Post()
    postPerson(@Body() createPersonDto:CreatePersonDto){
        return this.personsService.createPerson(createPersonDto)  
    }

    @Get()
    getAllPersons(){
        return this.personsService.findAllPerson()
    }

    @Get(':id')
    getPerson(@Param('id') idPerson:number){
        return this.personsService.findPerson(idPerson)
    }
}
