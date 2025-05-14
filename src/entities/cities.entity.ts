import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProvinceEntity } from './provinces.entity';

@Entity('Cities')
export class CityEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
 
    @ManyToOne(()=> ProvinceEntity, (province) => province.id)
    @JoinColumn()
    province: ProvinceEntity;
}