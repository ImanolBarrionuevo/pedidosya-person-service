import { IsString, IsEmail, IsNotEmpty, IsDate } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreatePersonDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser un texto.' })
  name: string;

  @IsNotEmpty({ message: 'El email es obligatorio.' })
  @IsEmail({}, { message: 'El email debe ser válido.' })
  email: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria.' })
  @Type(() => Date)
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida.' })
  birthDate: Date;

  @IsNotEmpty({ message: 'El ID de la ciudad es obligatorio.' })
  @Transform(({ value }) => ({ id: value }))
  city: { id: number }; 
}