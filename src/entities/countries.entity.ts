import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('countries')
export class CountriesEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string
}