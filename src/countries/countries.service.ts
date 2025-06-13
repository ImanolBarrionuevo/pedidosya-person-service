import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountriesEntity } from 'src/entities/countries.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CountriesService {

    constructor(@InjectRepository(CountriesEntity) private countriesRepository: Repository<CountriesEntity>) { }

    async createCountry(country: CreateCountryDto) {
        const newCountry = this.countriesRepository.create(country)
        await this.countriesRepository.save(newCountry)
        return newCountry
    }

    async findAllCountries() {
        const countries = await this.countriesRepository.find()
        return countries
    }

    async findCities(paginationDto: PaginationDto) {

        const currentPage = paginationDto.page
        if (!currentPage) {
            return this.findAllCountries()
        }
        const perPage = paginationDto.limit ?? 10

        return await this.countriesRepository.find({
            skip: (currentPage - 1) * perPage,
            take: perPage
        })
    }

    async findCountry(id: number) {
        const country = await this.countriesRepository.findOne({ where: { id: id } })
        if (!country) {
            throw new NotFoundException("Pais no encontrado")
        }
        return country
    }

    async updateCountry(id: number, updateCountry: CreateCountryDto) {
        await this.countriesRepository.update(id, updateCountry)
        return this.countriesRepository.findOne({ where: { id: id } })
    }

    async deleteCountry(id: number) {
        await this.countriesRepository.delete(id)
        return { "message": "deleted" }
    }

}
