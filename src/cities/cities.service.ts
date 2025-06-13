import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CitiesEntity } from 'src/entities/cities.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/patch-city.dto';
import { ProvincesEntity } from 'src/entities/provinces.entity';
import { PaginationDto } from 'src/dto/pagination.dto';

@Injectable()
export class CitiesService {

    constructor(@InjectRepository(CitiesEntity) private citiesRepository: Repository<CitiesEntity>,
        @InjectRepository(ProvincesEntity) private provincesRepository: Repository<ProvincesEntity>) { }

    async createCity(city: CreateCityDto) {
        const newCity = await this.citiesRepository.create(city)
        await this.citiesRepository.save(newCity)
        return this.findCity(newCity.id)
    }

    async findAllCity() {
        const cities = await this.citiesRepository.find({ relations: ["province", "province.country"] })
        return cities
    }

    async findCities(paginationDto: PaginationDto) {

        const currentPage = paginationDto.page
        if (!currentPage) {
            return this.findAllCity()
        }
        const perPage = paginationDto.limit ?? 10

        return await this.citiesRepository.find({
            skip: (currentPage - 1) * perPage,
            take: perPage
        })
    }

    async findCity(id: number) {
        const city = await this.citiesRepository.findOne({
            where: { id: id },
            relations: ["province", "province.country"]
        })
        if (!city) {
            throw new NotFoundException("Ciudad no encontrada")
        }
        return city
    }

    async updateCity(id: number, updateCity: CreateCityDto) {
        await this.citiesRepository.update(id, updateCity)
        return this.findCity(id)
    }

    async partialUpdateCity(id: number, updateCityDto: UpdateCityDto) {
        // Busca la ciudad en la base de datos
        const city = await this.citiesRepository.findOne({ where: { id } });
        if (!city) {
            throw new NotFoundException("Ciudad no encontrada");
        }

        // Si se proporciona una provincia, buscar su entidad
        if (updateCityDto.province) {
            const provinceEntity = await this.provincesRepository.findOne({ where: { id: updateCityDto.province.id } });
            if (provinceEntity) {
                city.province = provinceEntity;
            }
        }

        // Actualiza las propiedades simples que el DTO puede tener
        Object.assign(city, updateCityDto);

        // Guarda la entidad completa para que se actualicen tanto columnas simples como relaciones
        const updatedCity = await this.citiesRepository.save(city);
        return updatedCity;
    }

    async deleteCity(id: number) {
        await this.citiesRepository.delete(id);
        return { "message": "deleted" }
    }
}
