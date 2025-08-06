/**
 * Servicio de países para la API.
 * Gestiona la lógica de negocio y operaciones CRUD sobre la entidad de países,
 * incluyendo creación, búsqueda con paginación, actualización y eliminación.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountriesEntity } from 'src/entities/countries.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CountriesService {

    constructor(
        // Repositorio de CountriesEntity para operaciones CRUD en ciudades
        @InjectRepository(CountriesEntity) private countriesRepository: Repository<CountriesEntity>
    ) { }

    // Crea un nuevo país
    async createCountry(country: CreateCountryDto) {
        // Verifica que el pais no exista en la base de datos antes de crearlo
        const existingCountry = await this.countriesRepository.findOne({ where: { name: country.name } })
        // Si no existe, lo crea y lo guarda en la base de datos
        if (!existingCountry) {
            const newCountry = this.countriesRepository.create(country)
            await this.countriesRepository.save(newCountry)
            return newCountry;
        }
        throw new NotFoundException("Country already created")
    }

    // Busca todos los paises existentes en la base de datos
    async findAllCountries() {
        const countries = await this.countriesRepository.find()
        return countries;
    }

    // Busca los paises utilizando paginación
    async findCountries(paginationDto: PaginationDto) {
        // Extraemos el número de página enviado en el DTO
        const currentPage = paginationDto.page
        // En caso de que no haya, retornamos todos los paises
        if (!currentPage) {
            return this.findAllCountries()
        }

        const perPage = paginationDto.limit ?? 10; // Define el tamaño de la página y, en caso de que no haya, usa 10 por defecto

        // Busca las ciudades de una página en especifico
        return await this.countriesRepository.find({
            skip: (currentPage - 1) * perPage, // Calcula cuantos registros debe omitir
            take: perPage // Define cuantos registros obtener
        })
    }

    // Busca un pais a traves de su ID
    async findCountry(id: number) {
        const country = await this.countriesRepository.findOne(
            { where: { id: id } } // Devuelve la ciudad cuyo ID coincide con el ID que se pasa como parámetro
        )
        if (!country) {
            throw new NotFoundException("Country Not Found")
        }
        return country;
    }

    // Actualiza un país
    async updateCountry(id: number, updateCountry: CreateCountryDto) {
        const country = await this.findCountry(id); // Verifica que exista un país con el ID recibido y lo busca
        await this.countriesRepository.update(id, updateCountry)
        return this.findCountry(id) // Retorna el país actualizado
    }

    // Elimina un país
    async deleteCountry(id: number) {
        await this.countriesRepository.delete(id)
        return { "message": "deleted" }
    }

}
