import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountriesEntity } from 'src/entities/countries.entity';
import { ProvinceEntity } from 'src/entities/provinces.entity';
import { Repository } from 'typeorm';
import { CreateProvinceDto } from './dto/create-province.dto';
import { find } from 'rxjs';
import { PatchProvinceDto } from './dto/patch-province.dto';
import { PaginationDto } from './dto/pagination-country.dto';

@Injectable()
export class ProvincesService {

    constructor(@InjectRepository(ProvinceEntity) private provincesRepository: Repository<ProvinceEntity>){}

    async createProvince(province: CreateProvinceDto){
        const newProvince = this.provincesRepository.create(province)
        await this.provincesRepository.save(newProvince)
        return this.findProvince(newProvince.id)
    }

    async findAllProvince(){
        const provinces = await this.provincesRepository.find({relations: ['country']})
        return provinces
    }

    async findProvinces(paginationDto: PaginationDto){
    
        const currentPage = paginationDto.page
        if(!currentPage){
            return this.findAllProvince()
        }
        const perPage = paginationDto.limit ?? 10

        return await this.provincesRepository.find({
            skip: (currentPage - 1) * perPage,
            take: perPage
        })
    }

    async findProvince(id: number){
        const province = await this.provincesRepository.findOne({
            where: { id: id},
            relations: ['country'],
        });
        if (!province) {
            throw new NotFoundException("Provincia no encontrada");
        }
        return province
    }

    async updateProvince(id: number, updateProvince: CreateProvinceDto){
        await this.provincesRepository.update(id, updateProvince)
        return this.findProvince(id)
    }

    async partialUpdateProvince(id: number, updateProvince: PatchProvinceDto){
        const province = await this.findProvince(id)
        if (!province){
            throw new NotFoundException("Provincia no encontrada")
        }
        
        Object.keys(updateProvince).forEach(column => {province[column] = updateProvince[column]})

        await this.provincesRepository.update(id,province)
        return this.findProvince(id)
    }

    async deleteProvince(id:number){
        await this.provincesRepository.delete(id)
        return {"message": "deleted"}
    }
}
