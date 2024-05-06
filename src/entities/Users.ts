/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Cart from './Cart'

@Index('users_pkey', ['userId'], { unique: true })
@Entity('users', { schema: 'public' })
export default class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'user_id' })
  userId!: number

  @Column('character varying', {
    name: 'user_firstName',
    nullable: true,
    length: 50,
  })
  userFirstName!: string | null

  @Column('character varying', {
    name: 'user_lastName',
    nullable: true,
    length: 50,
  })
  userLastName!: string | null

  @Column('character varying', {
    name: 'user_password',
    nullable: true,
    length: 250,
  })
  userPassword!: string | null

  @Column('timestamp with time zone', {
    name: 'user_createdAt',
    nullable: true,
  })
  userCreatedAt!: Date | null

  @Column('boolean', { name: 'user_isActive', nullable: true })
  userIsActive!: boolean | null

  @Column('character varying', {
    name: 'user_email',
    nullable: true,
    length: 50,
  })
  userEmail!: string | null

  @Column('character varying', {
    name: 'user_role',
    nullable: true,
    length: 50,
    default: () => "'user'",
  })
  userRole!: string | null

  @OneToMany(() => Cart, (cart) => cart.user)
  carts!: Cart[]
}
