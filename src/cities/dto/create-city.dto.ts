import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateCityDto{
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @IsString({ message: 'El nombre debe ser un texto.' })
    name: string;

    @IsDefined({message: 'El id de provincia es obligatorio.'}) 
    @IsNotEmpty({ message: 'El id de provincia no puede estar vacio.' })
    @Transform(({ value }) => ({ id: value }))
    province: { id: number }
}