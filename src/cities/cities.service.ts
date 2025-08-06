/**
 * Servicio de ciudades para la API.
 * Maneja operaciones CRUD para ciudades, incluyendo asociación con provincias y países.
 * Ofrece soporte para paginación, actualización total o parcial, y manejo de relaciones anidadas.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CitiesEntity } from 'src/entities/cities.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/patch-city.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProvincesService } from 'src/provinces/provinces.service';

@Injectable()
export class CitiesService {


    constructor(
        // Repositorio de CitiesEntity para operaciones CRUD en ciudades
        @InjectRepository(CitiesEntity) private citiesRepository: Repository<CitiesEntity>,
        // Servicio Provinces para manejar operaciones relacionadas con provincias
        private provincesService: ProvincesService) { }

    // Crea una ciudad
    async createCity(city: CreateCityDto) {
        const provinceEntity = await this.provincesService.findProvince(city.province) // Busca la provincia asociada a la ciudad
        const newCity = await this.citiesRepository.create({
            name: city.name,
            province: provinceEntity, // Asigna la entidad de provincia a la nueva ciudad
        })
        await this.citiesRepository.save(newCity)
        return newCity;
    }

    // Busca todas las ciudades existentes en la BD junto a su provincia y pais asociado
    async findAllCity() {
        const cities = await this.citiesRepository.find({ relations: ["province", "province.country"] })
        return cities;
    }

    // Busca las ciudades utilizando paginación
    async findCities(paginationDto: PaginationDto) {
        const currentPage = paginationDto.page // Extrae el número de página enviado en el DTO
        if (!currentPage) { // En caso de que no haya, retorna todas las ciudades
            return this.findAllCity()
        }

        const perPage = paginationDto.limit ?? 10 // Define el tamaño de la página y, en caso de que no haya, usa 10 por defecto

        // Busca las ciudades de una página en especifico
        return await this.citiesRepository.find({
            skip: (currentPage - 1) * perPage, // Calcula cuantos registros debe omitir
            take: perPage // Define cuantos registros obtener
        })
    }

    // Busca una ciudad a traves de su ID, junto a su provincia y pais asociado
    async findCity(id: number) {
        const city = await this.citiesRepository.findOne({
            where: { id: id }, // Devuelve la ciudad cuyo ID coincida con el ID pasado como parametro
            relations: ["province", "province.country"]
        })
        if (!city) {
            throw new NotFoundException("City Not Found")
        }
        return city;
    }

    // Actualiza una ciudad
    async updateCity(id: number, updateCity: CreateCityDto) {
        const cityEntity = await this.findCity(id); // Verifica que exista una ciudad con el ID recibido y la busca
        Object.assign(cityEntity, updateCity); // Actualiza las propiedades simples (no objetos) que el DTO puede tener

        // Busca la entidad de la provincia para asignarla a la ciudad
        const provinceEntity = await this.provincesService.findProvince(updateCity.province);
        cityEntity.province = provinceEntity;

        await this.citiesRepository.save(cityEntity);
        return cityEntity;
    }


    // Actualiza parcialmente una ciudad
    async partialUpdateCity(id: number, updateCityDto: UpdateCityDto) {
        const city = await this.findCity(id); // Verifica que exista una ciudad con el ID recibido y la busca
        Object.assign(city, updateCityDto); // Actualiza las propiedades simples (no objetos) que el DTO puede tener.

        // Si se proporciona una provincia, busca su entidad para asignarla a la ciudad
        if (updateCityDto.province) {
            const provinceEntity = await this.provincesService.findProvince(updateCityDto.province);
            city.province = provinceEntity;
        }

        // Guarda la entidad completa para que se actualicen tanto columnas simples como relaciones.
        const updatedCity = await this.citiesRepository.save(city);
        return updatedCity;
    }

    // Elimina una ciudad
    async deleteCity(id: number) {
        await this.citiesRepository.delete(id);
        return { "message": "deleted" }
    }
}
