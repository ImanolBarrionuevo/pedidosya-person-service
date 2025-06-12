import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CitiesEntity } from './cities.entity';

@Entity('persons')
export class PersonsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ type: 'date' })
    birthDate: Date;

    @ManyToOne(() => CitiesEntity, (city) => city.id)
    @JoinColumn()
    city: CitiesEntity;
}





