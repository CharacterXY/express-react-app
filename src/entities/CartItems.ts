/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Cart from './Cart'
import Products from './Products'
import Size from './Size'

@Index('cart_items_pkey', ['cartItemId'], { unique: true })
@Entity('cart_items', { schema: 'public' })
export default class CartItems extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'cart_item_id' })
  cartItemId!: number

  @Column('integer', { name: 'quantity', nullable: true })
  quantity!: number | null

  @Column('numeric', { name: 'price', nullable: true, precision: 10, scale: 2 })
  price!: string | null

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn([{ name: 'cart_id', referencedColumnName: 'cartId' }])
  cart!: Cart

  @ManyToOne(() => Products, (products) => products.cartItems)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'productId' }])
  product!: Products

  @ManyToOne(() => Size, (size) => size.cartItems)
  @JoinColumn([{ name: 'size_id', referencedColumnName: 'sizeId' }])
  size!: Size
}
