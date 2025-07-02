import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountriesEntity } from 'src/entities/countries.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CountriesService {

    constructor(
        // Repositorio de CitiesEntity para operaciones CRUD en ciudades
        @InjectRepository(CountriesEntity) private countriesRepository: Repository<CountriesEntity>
    ) { }

    // Creamos un pais
    async createCountry(country: CreateCountryDto) {
        // Verificamos que el pais no exista en la base de datos para crearlo
        const existingCountry = await this.countriesRepository.findOne({where: {name: country.name}})
        if(!existingCountry){
            const newCountry = this.countriesRepository.create(country)
            await this.countriesRepository.save(newCountry)
            return newCountry
        }
        throw new NotFoundException("Country already created")
    }

    // Buscamos todos los paises existentes en la base de datos
    async findAllCountries() {
        const countries = await this.countriesRepository.find()
        return countries
    }

    // Buscamos los paises utilizando paginación
    async findCountries(paginationDto: PaginationDto) {
        // Extraemos el número de página enviado en el DTO
        const currentPage = paginationDto.page
        // En caso de que no haya, retornamos todos los paises
        if (!currentPage) {
            return this.findAllCountries()
        }

        // Definimos el tamaño de la página y en caso de que no haya, usamos por defecto 10
        const perPage = paginationDto.limit ?? 10

        // Buscamos las ciudades de una página en especifico
        return await this.countriesRepository.find({
            skip: (currentPage - 1) * perPage, // Calculamos cuantos registros omitir
            take: perPage // Definimos cuantos registros obtener
        })
    }

    // Buscamos un pais a traves de su id
    async findCountry(id: number) {
        const country = await this.countriesRepository.findOne(
            { where: { id: id } } // Devolvemos la ciudad cuyo id coincida con el id pasado como parametro
        ) 
        if (!country) {
            throw new NotFoundException("Country Not Found")
        }
        return country
    }

    // Actualizamos un país
    async updateCountry(id: number, updateCountry: CreateCountryDto) {
        // Verificamos que exista el país a actualizar
        const country = await this.countriesRepository.findOne({ where: { id: id } });
        if (!country) {
            throw new NotFoundException("Country Not Found");
        }
        await this.countriesRepository.update(id, updateCountry)
        return this.countriesRepository.findOne({ where: { id: id } })
    }

    // Borramos un país
    async deleteCountry(id: number) {
        await this.countriesRepository.delete(id)
        return { "message": "deleted" }
    }

}
