import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';

/*La creación de interfaces y diccionarios son simplemente para realizar pruebas,
luego debe migrarse a una base de datos postgres*/

interface Country {
    id: number;
    name: string;
  }
  
interface Province {
    id: number;
    name: string;
    country: Country;
  }
  
export interface City {
    id: number;
    name: string;
    province: Province;
  }

@Injectable()
export class CitiesService {
      /*findCity(cityId: number): City{
        const city = this.cities[cityId]
        if(!city){
            throw new NotFoundException(`No se encontró la ciudad con id ${cityId}`);
        } 
        return city
      }*/
}
