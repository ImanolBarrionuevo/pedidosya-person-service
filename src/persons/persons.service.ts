import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonsEntity } from 'src/entities/persons.entity';
import { Repository } from 'typeorm';
import { UpdatePersonDto } from './dto/patch-person.dto';
import { CitiesEntity } from 'src/entities/cities.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PersonsService {

    constructor(@InjectRepository(PersonsEntity) private personsRepository: Repository<PersonsEntity>,
        @InjectRepository(CitiesEntity) private citiesRepository: Repository<CitiesEntity>) { }

    async createPerson(person: CreatePersonDto) {
        const newPerson = this.personsRepository.create(person)
        await this.personsRepository.insert(newPerson)
        return await this.findPerson(newPerson.id)
    }

    async findAllPerson() {
        const allPersons = await this.personsRepository.find({
            relations: ['city', 'city.province', 'city.province.country'],
        });
        return allPersons
    }

    async findPersons(paginationDto: PaginationDto) {

        const currentPage = paginationDto.page
        if (!currentPage) {
            return this.findAllPerson()
        }
        const perPage = paginationDto.limit ?? 10

        return await this.personsRepository.find({
            skip: (currentPage - 1) * perPage,
            take: perPage
        })
    }

    async findPerson(id: number) {
        const person = await this.personsRepository.findOne({
            where: { id: id },
            relations: ['city', 'city.province', 'city.province.country'],
        });
        if (!person) {
            throw new NotFoundException("Person Not Found");
        }
        return person
    }
    async updatePerson(id: number, updatePerson: CreatePersonDto) {
        await this.personsRepository.update(id, updatePerson)
        return this.findPerson(id)
    }

    async partialUpdatePerson(id: number, updatePersonDto: UpdatePersonDto) {
        const person = await this.personsRepository.findOne({ where: { id: id } })
        if (!person) {
            throw new NotFoundException("Person Not Found");
        }
        if (updatePersonDto.city) {
            const cityEntity = await this.citiesRepository.findOne({ where: { id: updatePersonDto.city.id } });
            if (cityEntity) {
                person.city = cityEntity;
            }
        }
        // Actualiza las propiedades simples que el DTO puede tener.
        Object.assign(person, updatePersonDto);

        // Guarda la entidad completa para que se actualicen tanto columnas simples como relaciones.
        const updatedUser = await this.personsRepository.save(person);
        return updatedUser;
    }

    async deletePerson(id: number) {
        await this.personsRepository.delete(id);
        return { "message": "deleted" }
    }

}
