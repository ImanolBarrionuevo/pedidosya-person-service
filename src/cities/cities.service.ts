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
        // Servicio de Provinces para manejar operaciones relacionadas con provincias
        private provincesService: ProvincesService) { }

    // Creamos una ciudad
    async createCity(city: CreateCityDto) {
        const provinceEntity = await this.provincesService.findProvince(city.province)
        const newCity = await this.citiesRepository.create({
            name: city.name,
            province: provinceEntity, // Asignamos la entidad de provincia a la nueva ciudad
        }) 
        await this.citiesRepository.save(newCity)
        return newCity // Retornamos los datos de la ciudad creada y almacenada
    }

    // Buscamos todas las ciudades existentes en la base de datos junto a su provincia y pais asociado
    async findAllCity() {
        const cities = await this.citiesRepository.find({ relations: ["province", "province.country"] })
        return cities
    }

    //  Buscamos las ciudades utilizando paginación
    async findCities(paginationDto: PaginationDto) {
        // Extraemos el número de página enviado en el DTO
        const currentPage = paginationDto.page 
        // En caso de que no haya, retornamos todas las ciudades
        if (!currentPage) {
            return this.findAllCity()
        }

        // Definimos el tamaño de la página y en caso de que no haya, usamos por defecto 10
        const perPage = paginationDto.limit ?? 10

        // Buscamos las ciudades de una página en especifico
        return await this.citiesRepository.find({
            skip: (currentPage - 1) * perPage, // Calculamos cuantos registros omitir
            take: perPage // Definimos cuantos registros obtener
        })
    }

    // Buscamos una ciudad a traves de su id, junto a su provincia y pais asociado
    async findCity(id: number) {
        const city = await this.citiesRepository.findOne({
            where: { id: id }, // Devolvemos la ciudad cuyo id coincida con el id pasado como parametro
            relations: ["province", "province.country"]
        })
        if (!city) {
            throw new NotFoundException("City Not Found")
        }
        return city
    }

    // Actualizamos una ciudad
    async updateCity(id: number, updateCity: CreateCityDto) {
        const cityEntity = await this.findCity(id); // Verificamos que exista una ciudad con el id que recibimos
        // Actualizamos las propiedades simples (no objetos) que el DTO puede tener.
        Object.assign(cityEntity, updateCity);

        // Buscamos la entidad de la provincia para asignarla a la ciudad
        const provinceEntity = await this.provincesService.findProvince(updateCity.province);
        cityEntity.province = provinceEntity; // Asignamos la entidad de provincia a la ciudad

        await this.citiesRepository.save(cityEntity);
        return cityEntity;
    }
    

    // Actualizamos parcialmente una ciudad
    async partialUpdateCity(id: number, updateCityDto: UpdateCityDto) {
        // Verificamos que exista una ciudad con el id que recibimos
        const city = await this.findCity(id);

        // Actualizamos las propiedades simples (no objetos) que el DTO puede tener.
        Object.assign(city, updateCityDto);

        // Si se proporciona una provincia, buscamos su entidad para asignarla a la ciudad
        if (updateCityDto.province) {
            const provinceEntity = await this.provincesService.findProvince(updateCityDto.province);
            city.province = provinceEntity; // Asignamos la entidad de provincia a la ciudad
        }

        // Guardamos la entidad completa para que se actualicen tanto columnas simples como relaciones.
        const updatedCity = await this.citiesRepository.save(city);
        return updatedCity;
    }

    // Eliminamos una ciudad
    async deleteCity(id: number) {
        await this.citiesRepository.delete(id);
        return { "message": "deleted" }
    }
}
