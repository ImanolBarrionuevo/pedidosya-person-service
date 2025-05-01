import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class PatchProvinceDto{
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @IsString({ message: 'El nombre debe ser un texto.' })
    name?: string;

    @IsNotEmpty({ message: 'El id de pais es obligatorio.' })
    @IsNumber({}, { message: 'El id debe ser un número.' })
    @Transform(({ value }) => ({ id: value }))
    country?: { id: number };
}