import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CountriesEntity } from './countries.entity';

@Entity('Provinces')
export class ProvinceEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(()=> CountriesEntity, (country) => country.id)
    @JoinColumn()
    country: CountriesEntity;
}