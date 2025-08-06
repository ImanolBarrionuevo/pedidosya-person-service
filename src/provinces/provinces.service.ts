/**
 * Servicio de provincias para la API.
 * Administra la lógica de negocio y operaciones CRUD sobre la entidad de provincias,
 * incluyendo paginación, actualización parcial y asociación con países.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvincesEntity } from 'src/entities/provinces.entity';
import { Repository } from 'typeorm';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/patch-province.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CountriesService } from 'src/countries/countries.service';

@Injectable()
export class ProvincesService {

    constructor(
        // Repositorio de ProvincesEntity para operaciones CRUD en provincias
        @InjectRepository(ProvincesEntity) private provincesRepository: Repository<ProvincesEntity>,
        // Servicio Countries para buscar un país especifico
        private countriesService: CountriesService
    ) { }

    // Crea una provincia
    async createProvince(province: CreateProvinceDto) {
        const countryEntity = await this.countriesService.findCountry(province.country); // Busca el país asociado a la provincia
        const newProvince = this.provincesRepository.create({
            name: province.name,
            country: countryEntity // Asigna la entidad de país a la nueva provincia
        })
        await this.provincesRepository.save(newProvince)
        return newProvince;
    }

    // Busca todas las provincias existentes en la BD junto a su país asociado
    async findAllProvince() {
        const provinces = await this.provincesRepository.find({ relations: ['country'] })
        return provinces;
    }

    //  Busca las provincias utilizando paginación
    async findProvinces(paginationDto: PaginationDto) {
        const currentPage = paginationDto.page // Extrae el número de página enviado en el DTO
        if (!currentPage) { // En caso de que no haya, retorna todas las provincias
            return this.findAllProvince()
        }

        const perPage = paginationDto.limit ?? 10 // Define el tamaño de la página y, en caso de que no haya, usa 10 por defecto

        // Busca las provincias de una página en especifico
        return await this.provincesRepository.find({
            skip: (currentPage - 1) * perPage, // Calcula cuantos registros debe omitir
            take: perPage // Define cuantos registros obtener
        })
    }

    // Busca una provincia a traves de su ID, junto a su pais asociado
    async findProvince(id: number) {
        const province = await this.provincesRepository.findOne({
            where: { id: id }, // Devuelve la provincia cuyo ID coincide con el ID que se pasa como parámetro
            relations: ['country'],
        });
        if (!province) {
            throw new NotFoundException("Province Not Found");
        }
        return province;
    }

    // Actualiza una provincia
    async updateProvince(id: number, updateProvince: CreateProvinceDto) {
        const province = await this.findProvince(id); // Verifica que exista una provincia con el ID recibido y la busca
        Object.assign(province, updateProvince); // Actualiza las propiedades simples (no objetos) que el DTO puede tener

        // Busca la entidad del país para asignarla a la provincia
        const countryEntity = await this.countriesService.findCountry(updateProvince.country);
        province.country = countryEntity;

        await this.provincesRepository.save(province);
        return province;
    }

    // Actualiza parcialmente una provincia
    async partialUpdateProvince(id: number, updateProvinceDto: UpdateProvinceDto) {
        const province = await this.findProvince(id); // Verifica que exista una provincia con el ID recibido y la busca
        Object.assign(province, updateProvinceDto);// Actualiza las propiedades simples (no objetos) que el DTO puede tener.

        // Si se proporciona un país, busca su entidad para asignarla a la provincia
        if (updateProvinceDto.country) {
            const countryEntity = await this.countriesService.findCountry(updateProvinceDto.country);
            province.country = countryEntity;
        }

        // Guarda la entidad completa para que se actualicen tanto columnas simples como relaciones
        const updatedProvince = await this.provincesRepository.save(province);
        return updatedProvince;
    }

    // Elimina una provincia
    async deleteProvince(id: number) {
        await this.provincesRepository.delete(id)
        return { "message": "deleted" }
    }
}
