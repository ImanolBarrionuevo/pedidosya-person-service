import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class UserEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
  @Column()
  password: string;

  get permissionCodes() {
    return ['create-users', 'list-products'];
  }
}
