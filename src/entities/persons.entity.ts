import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CityEntity } from './cities.entity';

@Entity('Persons')
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





