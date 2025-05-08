import { Type, Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsEmail, IsDate, IsNumber } from "class-validator";

export class UpdatePersonDto{
    @IsString({ message: 'El nombre debe ser un texto.' })
    name?: string;

    @IsEmail({}, { message: 'El email debe ser válido.' })
    email?: string;

    @Type(() => Date)
    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida.' })
    birthDate?: Date;

    @IsNumber({}, { message: 'El ID de la ciudad debe ser numérico.' })
    @Transform(({ value }) => ({ id: value }))
    city?: { id: number };
}

