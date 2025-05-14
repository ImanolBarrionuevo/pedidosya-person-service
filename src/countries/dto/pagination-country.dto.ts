import { IsOptional, IsPositive} from 'class-validator';
import { Transform} from 'class-transformer';

export class PaginationDto {
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    page?: number;

    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    limit?: number;
}