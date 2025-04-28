import { Body, Controller, Post } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './create-person.dto';

@Controller('persons')
export class PersonsController {

    constructor(private personsService: PersonsService){}

    @Post("/person")
    postPerson(@Body() createPersonDto:CreatePersonDto): string{
        return this.personsService.createPerson(createPersonDto)
    }
}
