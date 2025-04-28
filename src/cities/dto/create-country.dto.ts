import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCountryDto{
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @IsString({ message: 'El nombre debe ser un texto.' })
    name: string;
}