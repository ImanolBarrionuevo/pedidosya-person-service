import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProvincesEntity } from './provinces.entity';

@Entity('Cities')
export class CitiesEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => ProvincesEntity, (province) => province.id)
    @JoinColumn()
    province: ProvincesEntity;
}