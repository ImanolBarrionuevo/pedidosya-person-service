import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonsEntity } from 'src/entities/persons.entity';
import { Repository } from 'typeorm';
import { UpdatePersonDto } from './dto/patch-person.dto';
import { PaginationDto } from './dto/pagination-person.dto';

@Injectable()
export class PersonsService {

    constructor(@InjectRepository(PersonsEntity) private personsRepository: Repository<PersonsEntity>){}

    async createPerson(person:CreatePersonDto){
        const newPerson = this.personsRepository.create(person)
        await this.personsRepository.insert(newPerson)
        return await this.findPerson(newPerson.id)
    }

    async findAllPerson(){
        const allPersons = await this.personsRepository.find({
            relations: ['city', 'city.province', 'city.province.country'],
        });
        return allPersons
    }

    async findPersons(paginationDto: PaginationDto){
    
        const currentPage = paginationDto.page ?? 1
        const perPage = paginationDto.limit ?? 10

        return await this.personsRepository.find({
            skip: (currentPage - 1) * perPage,
            take: perPage
        })
    }

    async findPerson(id: number){
        const person = await this.personsRepository.findOne({
            where: { id: id},
            relations: ['city', 'city.province', 'city.province.country'],
        });
        if (!person) {
            throw new NotFoundException("Persona no encontrada");
        }
        return person
    }
    async updatePerson(id: number, updatePerson:CreatePersonDto){
        await this.personsRepository.update(id, updatePerson)
        return this.findPerson(id)
    }

    async partialUpdatePerson(id: number, updatePerson:UpdatePersonDto){
        const person = await this.personsRepository.findOne({where: {id:id}})
        if (!person) {
            throw new NotFoundException("Persona no encontrada");
        }

        Object.keys(updatePerson).forEach(column => {
            person[column] = updatePerson[column];
        })

        await this.personsRepository.update(id, person)
        return person
    }

    async deletePerson(id:number){
        await this.personsRepository.delete(id);
        return {"message": "deleted"}
    }
    
}
