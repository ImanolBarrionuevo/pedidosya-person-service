import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class UserEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Index({unique:true})
  @Column()
  email: string;
  @Column()
  password: string;

  get permissionCodes() {
    return ['create-users', 'list-products'];
  }
}
