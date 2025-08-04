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
        // Service de cities para manejar operaciones relacionadas con ciudades
        private citiesService: CitiesService) { }

    // Creamos una persona
    async createPerson(person: CreatePersonDto) {
        const newPerson = this.personsRepository.create(person)
        await this.personsRepository.insert(newPerson)
        return await this.findPerson(newPerson.id)
    }

    // Buscamos todas las personas existentes en la base de datos junto a su ciudad, provincia y pais asociado
    async findAllPerson() {
        const allPersons = await this.personsRepository.find({
            relations: ['city', 'city.province', 'city.province.country'],
        });
        return allPersons
    }

    //  Buscamos las personas utilizando paginación
    async findPersons(paginationDto: PaginationDto) {
        // Extraemos el número de página enviado en el DTO
        const currentPage = paginationDto.page
        // En caso de que no haya, retornamos todas las ciudades
        if (!currentPage) {
            return this.findAllPerson()
        }

        // Definimos el tamaño de la página y en caso de que no haya, usamos por defecto 10
        const perPage = paginationDto.limit ?? 10

        // Buscamos las ciudades de una página en especifico
        return await this.personsRepository.find({
            skip: (currentPage - 1) * perPage, // Calculamos cuantos registros omitir
            take: perPage // Definimos cuantos registros obtener
        })
    }

    // Buscamos una persona a traves de su id, junto a su ciudad, provincia y pais asociado
    async findPerson(id: number) {
        const person = await this.personsRepository.findOne({
            where: { id: id }, // Devolvemos la persona cuyo id coincida con el id pasado como parametro
            relations: ['city', 'city.province', 'city.province.country'],
        });
        if (!person) {
            throw new NotFoundException("Person Not Found");
        }
        return person
    }

    // Actualizamos una persona
    async updatePerson(id: number, updatePerson: CreatePersonDto) {
        await this.personsRepository.update(id, updatePerson)
        return this.findPerson(id)
    }

    // Actualizamos parcialmente una persona
    async partialUpdatePerson(id: number, updatePersonDto: UpdatePersonDto) {
        // Verificamos que exista una persona con el id que recibimos
        const person = await this.personsRepository.findOne({ where: { id: id } })
        if (!person) {
            throw new NotFoundException("Person Not Found");
        }

        // Si se proporciona una ciudad, buscamos su entidad para asignarla a la persona
        if (updatePersonDto.city) {
            const cityEntity = await this.citiesService.findCity(updatePersonDto.city.id);
            person.city = cityEntity; // Asignamos la entidad de ciudad a la persona
        }
        // Actualizamos las propiedades simples (no objetos) que el DTO puede tener.
        Object.assign(person, updatePersonDto);

        // Guardamos la entidad completa para que se actualicen tanto columnas simples como relaciones.
        const updatedUser = await this.personsRepository.save(person);
        return updatedUser;
    }

    // Eliminamos una persona
    async deletePerson(id: number) {
        await this.personsRepository.delete(id);
        return { "message": "deleted" }
    }

}
