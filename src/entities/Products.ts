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
import CartItems from './CartItems'
import ProductPictures from './ProductPictures'
import ProductSizes from './ProductSizes'
import Categories from './Categories'

@Index('products_pkey', ['productId'], { unique: true })
@Entity('products', { schema: 'public' })
export default class Products extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'product_id' })
  productId!: number

  @Column('character varying', {
    name: 'product_title',
    nullable: true,
    length: 250,
  })
  productTitle!: string | null

  @Column('text', { name: 'product_description', nullable: true })
  productDescription!: string | null

  @Column('numeric', { name: 'product_rating', nullable: true })
  productRating!: string | null

  @Column('character varying', {
    name: 'product_code',
    nullable: true,
    length: 255,
  })
  productCode!: string | null

  @Column('integer', { name: 'product_stock', nullable: true })
  productStock!: number | null

  @Column('character varying', {
    name: 'product_brend',
    nullable: true,
    length: 50,
  })
  productBrend!: string | null

  @Column('boolean', { name: 'product_isavailable', nullable: true })
  productIsavailable!: boolean | null

  @Column('boolean', { name: 'product_atdiscount', nullable: true })
  productAtdiscount!: boolean | null

  @Column('integer', { name: 'product_discount', nullable: true })
  productDiscount!: number | null

  @OneToMany(() => CartItems, (cartItems) => cartItems.product)
  cartItems!: CartItems[]

  @OneToMany(
    () => ProductPictures,
    (productPictures) => productPictures.product,
  )
  productPictures!: ProductPictures[]

  @OneToMany(() => ProductSizes, (productSizes) => productSizes.product)
  productSizes!: ProductSizes[]

  @ManyToOne(() => Categories, (categories) => categories.products)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'categoryId' }])
  category!: Categories

  @Column({ name: 'category_id', nullable: true, type: 'number' })
  categoryId!: number
}
