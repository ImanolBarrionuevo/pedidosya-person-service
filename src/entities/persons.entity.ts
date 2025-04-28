import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Country')
export class CountryEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string
}

@Entity('Province')
export class ProvinceEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(()=> CountryEntity, (country) => country.id)
    @JoinColumn()
    country: CountryEntity;
}

@Entity('City')
export class CityEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(()=> ProvinceEntity, (province) => province.id)
    @JoinColumn()
    province: ProvinceEntity;
}

@Entity('persons')
export class PersonsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({type: 'date'})
    birthDate: Date;

    @ManyToOne(()=> CityEntity, (city) => city.id)
    @JoinColumn()
    city: CityEntity;
}





