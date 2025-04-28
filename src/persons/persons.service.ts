import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './create-person.dto';
import { CitiesService } from 'src/cities/cities.service';

@Injectable()
export class PersonsService {

    /*
    constructor(private citiesService: CitiesService){}

    createPerson(createPersonDto: CreatePersonDto): string{
        const city = this.citiesService.findCity(createPersonDto.cityId);
        if (!city) {
            throw new NotFoundException(`No se encontró la ciudad con id ${createPersonDto.cityId}`);
        }
    
        // Retornamos un string que concatena la información del DTO y la ciudad encontrada
        return `Person created: ${JSON.stringify(createPersonDto)} + ${JSON.stringify(city)}`;
    }*/
}
