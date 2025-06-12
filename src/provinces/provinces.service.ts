import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountriesEntity } from 'src/entities/countries.entity';
import { ProvincesEntity } from 'src/entities/provinces.entity';
import { Repository } from 'typeorm';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/patch-province.dto';
import { PaginationDto } from './dto/pagination-country.dto';

@Injectable()
export class ProvincesService {

    constructor(@InjectRepository(ProvincesEntity) private provincesRepository: Repository<ProvincesEntity>,
        @InjectRepository(CountriesEntity) private countriesRepository: Repository<CountriesEntity>) { }

    async createProvince(province: CreateProvinceDto) {
        const newProvince = this.provincesRepository.create(province)
        await this.provincesRepository.save(newProvince)
        return this.findProvince(newProvince.id)
    }

    async findAllProvince() {
        const provinces = await this.provincesRepository.find({ relations: ['country'] })
        return provinces
    }

    async findProvinces(paginationDto: PaginationDto) {

        const currentPage = paginationDto.page
        if (!currentPage) {
            return this.findAllProvince()
        }
        const perPage = paginationDto.limit ?? 10

        return await this.provincesRepository.find({
            skip: (currentPage - 1) * perPage,
            take: perPage
        })
    }

    async findProvince(id: number) {
        const province = await this.provincesRepository.findOne({
            where: { id: id },
            relations: ['country'],
        });
        if (!province) {
            throw new NotFoundException("Provincia no encontrada");
        }
        return province
    }

    async updateProvince(id: number, updateProvince: CreateProvinceDto) {
        await this.provincesRepository.update(id, updateProvince)
        return this.findProvince(id)
    }

    async partialUpdateProvince(id: number, updateProvinceDto: UpdateProvinceDto) {
        // Busca la ciudad en la base de datos
        const province = await this.provincesRepository.findOne({ where: { id } });
        if (!province) {
            throw new NotFoundException("Ciudad no encontrada");
        }

        // Si se proporciona una provincia, buscar su entidad
        if (updateProvinceDto.country) {
            const countryEntity = await this.countriesRepository.findOne({ where: { id: updateProvinceDto.country.id } });
            if (countryEntity) {
                province.country = countryEntity;
            }
        }

        // Actualiza las propiedades simples que el DTO puede tener
        Object.assign(province, updateProvinceDto);

        // Guarda la entidad completa para que se actualicen tanto columnas simples como relaciones
        const updatedProvince = await this.provincesRepository.save(province);
        return updatedProvince;
    }

    async deleteProvince(id: number) {
        await this.provincesRepository.delete(id)
        return { "message": "deleted" }
    }
}
