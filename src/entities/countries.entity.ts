import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Countries')
export class CountryEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string
}