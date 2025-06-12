import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CountriesEntity } from './countries.entity';

@Entity('Provinces')
export class ProvincesEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => CountriesEntity, (country) => country.id)
    @JoinColumn()
    country: CountriesEntity;
}