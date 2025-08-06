/**
 * DTO para paginación en endpoints de la API.
 * Permite recibir y validar los parámetros de página y límite en las consultas.
 */

import { IsOptional, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
    // Número de página (opcional, positivo)
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    page?: number;

    // Límite de ítems por página (opcional, positivo)
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    limit?: number;
}