import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Permissions')
export class UserEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  get permissionCodes() {
    return ['create-users', 'list-products'];
  }
}