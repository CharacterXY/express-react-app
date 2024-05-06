/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import CartItems from './CartItems'
import ProductSizes from './ProductSizes'

@Index('size_pkey', ['sizeId'], { unique: true })
@Entity('size', { schema: 'public' })
export default class Size extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'size_id' })
  sizeId!: number

  @Column('character varying', {
    name: 'size_name',
    nullable: true,
    length: 50,
  })
  sizeName!: string | null

  @OneToMany(() => CartItems, (cartItems) => cartItems.size)
  cartItems!: CartItems[]

  @OneToMany(() => ProductSizes, (productSizes) => productSizes.size)
  productSizes!: ProductSizes[]
}
