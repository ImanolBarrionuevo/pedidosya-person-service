/**
 * Servicio de personas para la API.
 * Administra operaciones CRUD sobre la entidad de personas, con lógica de asociación a ciudades
 * y soporte para paginación, actualización total o parcial, y relaciones anidadas con ciudad, provincia y país.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonsEntity } from 'src/entities/persons.entity';
import { Repository } from 'typeorm';
import { UpdatePersonDto } from './dto/patch-person.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CitiesService } from 'src/cities/cities.service';

@Injectable()
export class PersonsService {

    constructor(
        // Repositorio de PersonsEntity para operaciones CRUD en personas
        @InjectRepository(PersonsEntity) private personsRepository: Repository<PersonsEntity>,
        // Servicio Cities para manejar operaciones relacionadas con ciudades
        private citiesService: CitiesService) { }

    // Crea una persona
    async createPerson(person: CreatePersonDto) {
        const cityEntity = await this.citiesService.findCity(person.city);
        const newPerson = this.personsRepository.create({
            name: person.name,
            email: person.email,
            birthDate: person.birthDate,
            city: cityEntity, // Asigna la entidad de ciudad a la nueva persona
        })
        await this.personsRepository.insert(newPerson)
        return newPerson;
    }

    // Busca todas las personas existentes en la BD junto a su ciudad, provincia y pais asociado
    async findAllPerson() {
        const allPersons = await this.personsRepository.find({
            relations: ['city', 'city.province', 'city.province.country'],
        });
        return allPersons
    }

    //  Busca las personas utilizando paginación
    async findPersons(paginationDto: PaginationDto) {
        const currentPage = paginationDto.page // Extrae el número de página enviado en el DTO
        if (!currentPage) { // En caso de que no haya, retorna todas las personas
            return this.findAllPerson()
        }

        const perPage = paginationDto.limit ?? 10; // Define el tamaño de la página y, en caso de que no haya, usa 10 por defecto

        // Buscam las personas de una página en especifico
        return await this.personsRepository.find({
            skip: (currentPage - 1) * perPage, // Calcula cuantos registros debe omitir
            take: perPage // Define cuantos registros obtener
        })
    }

    // Busca una persona a traves de su ID, junto a su ciudad, provincia y pais asociado
    async findPerson(id: number) {
        const person = await this.personsRepository.findOne({
            where: { id: id }, // Devuelve la persona cuyo ID coincida con el ID pasado como parametro
            relations: ['city', 'city.province', 'city.province.country'],
        });
        if (!person) {
            throw new NotFoundException("Person Not Found");
        }
        return person;
    }

    // Actualiza una persona
    async updatePerson(id: number, updatePersonDto: CreatePersonDto) {
        const person = await this.findPerson(id);  // Verifica que exista una persona con el ID recibido y la busca
        Object.assign(person, updatePersonDto); // Actualiza las propiedades simples (no objetos) que el DTO puede tener

        // Busca la entidad de la ciudad para asignarla a la persona
        const cityEntity = await this.citiesService.findCity(updatePersonDto.city);
        person.city = cityEntity;

        await this.personsRepository.save(person);
        return person;
    }

    // Actualiz parcialmente una persona
    async partialUpdatePerson(id: number, updatePersonDto: UpdatePersonDto) {

        const person = await this.findPerson(id); // Verifica que exista una persona con el ID recibido y la busca
        Object.assign(person, updatePersonDto); // Actualiza las propiedades simples (no objetos) que el DTO puede tener.

        // Si se proporciona una ciudad, busca su entidad para asignarla a la persona
        if (updatePersonDto.city) {
            const cityEntity = await this.citiesService.findCity(updatePersonDto.city);
            person.city = cityEntity;
        }

        await this.personsRepository.save(person);
        return person;
    }

    // Elimina una persona
    async deletePerson(id: number) {
        await this.personsRepository.delete(id);
        return { "message": "deleted" }
    }

}
