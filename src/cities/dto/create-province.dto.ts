import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProvinceDto{
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @IsString({ message: 'El nombre debe ser un texto.' })
    name: string;

    @IsNotEmpty({ message: 'El id de pais es obligatorio.' })
    @IsNumber({}, { message: 'El id debe ser un número.' })
    countryId: number;
}