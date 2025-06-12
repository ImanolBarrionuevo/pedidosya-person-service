import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { CreateProvinceDto } from './create-province.dto';
import { PartialType } from "@nestjs/mapped-types";

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @IsString({ message: 'El nombre debe ser un texto.' })
    name?: string;

    @IsNotEmpty({ message: 'El id de pais es obligatorio.' })
    @IsNumber({}, { message: 'El id debe ser un número.' })
    country?: { id: number };
}