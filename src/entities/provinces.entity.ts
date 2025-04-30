import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CountryEntity } from './countries.entity';

@Entity('Provinces')
export class ProvinceEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(()=> CountryEntity, (country) => country.id)
    @JoinColumn()
    countryId: CountryEntity;
}