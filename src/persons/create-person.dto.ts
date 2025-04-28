import { IsString, IsEmail, IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePersonDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser un texto.' })
  readonly name: string;

  @IsNotEmpty({ message: 'El email es obligatorio.' })
  @IsEmail({}, { message: 'El email debe ser válido.' })
  readonly email: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria.' })
  @Type(() => Date)
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida.' })
  readonly birthDate: Date;

  @IsNotEmpty({ message: 'El ID de la ciudad es obligatorio.' })
  @IsNumber({}, { message: 'El ID de la ciudad debe ser numérico.' })
  readonly cityId: number;
}