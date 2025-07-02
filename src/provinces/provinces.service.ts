import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountriesEntity } from 'src/entities/countries.entity';
import { ProvincesEntity } from 'src/entities/provinces.entity';
import { Repository } from 'typeorm';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/patch-province.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProvincesService {

    constructor(
        // Repositorio de ProvincesEntity para operaciones CRUD en provincias
        @InjectRepository(ProvincesEntity) private provincesRepository: Repository<ProvincesEntity>,
        // Repositorio de CountriesEntity para buscar un país especifica
        @InjectRepository(CountriesEntity) private countriesRepository: Repository<CountriesEntity>
    ) { }

    // Creamos una provincia
    async createProvince(province: CreateProvinceDto) {
        const newProvince = this.provincesRepository.create(province)
        await this.provincesRepository.save(newProvince)
        return this.findProvince(newProvince.id)
    }

    // Buscamos todas las provincias existentes en la base de datos junto a su país asociado
    async findAllProvince() {
        const provinces = await this.provincesRepository.find({ relations: ['country'] })
        return provinces
    }

    //  Buscamos las provincias utilizando paginación
    async findProvinces(paginationDto: PaginationDto) {
        // Extraemos el número de página enviado en el DTO
        const currentPage = paginationDto.page
        // En caso de que no haya, retornamos todas las provincias
        if (!currentPage) {
            return this.findAllProvince()
        }

        // Definimos el tamaño de la página y en caso de que no haya, usamos por defecto 10
        const perPage = paginationDto.limit ?? 10

        // Buscamos las provincias de una página en especifico
        return await this.provincesRepository.find({
            skip: (currentPage - 1) * perPage, // Calculamos cuantos registros omitir
            take: perPage // Definimos cuantos registros obtener
        })
    }

    // Buscamos una provincia a traves de su id, junto a su pais asociado
    async findProvince(id: number) {
        const province = await this.provincesRepository.findOne({
            where: { id: id }, // Devolvemos la provincia cuyo id coincida con el id pasado como parametro
            relations: ['country'],
        });
        if (!province) {
            throw new NotFoundException("Province Not Found");
        }
        return province
    }

    // Actualizamos una provincia
    async updateProvince(id: number, updateProvince: CreateProvinceDto) {
        await this.provincesRepository.update(id, updateProvince)
        return this.findProvince(id)
    }

    // Actualizamos parcialmente una provincia
    async partialUpdateProvince(id: number, updateProvinceDto: UpdateProvinceDto) {
        const province = await this.provincesRepository.findOne({ where: { id } });
        if (!province) {
            throw new NotFoundException("Province Not Found");
        }

        // Si se proporciona un país, buscamos su entidad para asignarla a la provincia
        if (updateProvinceDto.country) {
            const countryEntity = await this.countriesRepository.findOne({ where: { id: updateProvinceDto.country.id } });
            if (countryEntity) {
                province.country = countryEntity;
            }
        }

        // Actualizamos las propiedades simples (no objetos) que el DTO puede tener.
        Object.assign(province, updateProvinceDto);

        // Guardamos la entidad completa para que se actualicen tanto columnas simples como relaciones.
        const updatedProvince = await this.provincesRepository.save(province);
        return updatedProvince;
    }

    // Eliminamos una provincia
    async deleteProvince(id: number) {
        await this.provincesRepository.delete(id)
        return { "message": "deleted" }
    }
}
