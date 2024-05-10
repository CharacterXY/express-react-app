/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Users from './Users'
import CartItems from './CartItems'

@Index('cart_pkey', ['cartId'], { unique: true })
@Entity('cart', { schema: 'public' })
export default class Cart extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'cart_id' })
  cartId!: number

  @Column('numeric', { name: 'total', nullable: true, precision: 10, scale: 2 })
  total!: string | null

  @ManyToOne(() => Users, (users) => users.carts)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user!: Users

  @OneToMany(() => CartItems, (cartItems) => cartItems.cart)
  cartItems!: CartItems[]
}
