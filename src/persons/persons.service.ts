import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './create-person.dto';

@Injectable()
export class PersonsService {

    createPerson(createPersonDto: CreatePersonDto): string{
        return `Person created: ${JSON.stringify(createPersonDto)}`;
    }
}
