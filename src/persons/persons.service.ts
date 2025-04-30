import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './create-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonsEntity } from 'src/entities/persons.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonsService {

    constructor(@InjectRepository(PersonsEntity) private personsRepository: Repository<PersonsEntity>){}

    async createPerson(person:CreatePersonDto){
        const newPerson = this.personsRepository.create(person)
        await this.personsRepository.save(newPerson)
        return await this.findPerson(newPerson.id)
    }

    async findAllPerson(){
        const allPersons = await this.personsRepository.find({
            relations: ['cityId', 'cityId.provinceId', 'cityId.provinceId.countryId'],
        });
        return allPersons
    }

    async findPerson(id: number){
        const person = await this.personsRepository.findOne({
            where: { id: id},
            relations: ['cityId', 'cityId.provinceId', 'cityId.provinceId.countryId'],
        });
        return person
    }
    
}
