import { Body, Controller, Post } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './create-person.dto';

@Controller('persons')
export class PersonsController {

    constructor(private personsService: PersonsService){}

    @Post()
    postPerson(@Body() createPersonDto:CreatePersonDto): string{
        const personCreated = this.personsService.createPerson(createPersonDto)
        return personCreated
    }
}
