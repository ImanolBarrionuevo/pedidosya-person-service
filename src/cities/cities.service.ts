import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/entities/cities.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { PatchCityDto } from './dto/patch-city.dto';

@Injectable()
export class CitiesService {

    constructor(@InjectRepository(CityEntity) private citiesRepository: Repository<CityEntity>){}

    async createCity(city: CreateCityDto){
        const newCity = await this.citiesRepository.create(city)
        await this.citiesRepository.save(newCity)
        return this.findCity(newCity.id)
    }

    async findAllCity(){
        const cities = await this.citiesRepository.find({relations: ["provinceId", "provinceId.countryId"]})
        return cities
    }

    async findCity(id:number){
        const city = await this.citiesRepository.findOne({
            where: {id:id}, 
            relations: ["provinceId", "provinceId.countryId"]
        })
        if (!city){
            throw new NotFoundException("Ciudad no encontrada")
        }
        return city
    }

    async updateCity(id:number, updateCity:CreateCityDto){
        await this.citiesRepository.update(id,updateCity)   
        return this.findCity(id)
    }

    async partialUpdateCity(id:number, updateCity:PatchCityDto){
        const city = await this.findCity(id)
        if (!city) {
            throw new NotFoundException("Ciudad no encontrada")
        }

        Object.keys(updateCity).forEach(column => {city[column] = updateCity[column]})

        await this.citiesRepository.update(id,city)
        return this.findCity(id)
    }

    async deleteCity(id:number){
        await this.citiesRepository.delete(id)
        return {"message": "deleted"}
    }

}
