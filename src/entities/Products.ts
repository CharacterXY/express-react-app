/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsString,
} from 'class-validator'
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
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
  @Column('numeric', { name: 'product_price', nullable: true })
  @IsNumber({}, { message: 'Product price must be a number' })
  @IsOptional()
  productPrice!: number | null

  @Column('character varying', {
    name: 'product_model',
    nullable: true,
    length: 255,
  })
  @IsOptional()
  @IsString({ message: 'Product model must be a string' })
  productModel!: string | null

  @IsNotEmpty({ message: 'Product title is required' })
  productTitle!: string | null

  @Column('text', { name: 'product_description', nullable: true })
  @IsOptional()
  productDescription!: string | null

  @Column('numeric', { name: 'product_rating', nullable: true })
  @IsNumber({}, { message: 'Product rating must be a number' })
  @IsOptional()
  productRating!: number | null

  @Column('character varying', {
    name: 'product_code',
    nullable: true,
    length: 255,
  })
  @IsNotEmpty({ message: 'Product code is required' })
  productCode!: string | null

  @Column('integer', { name: 'product_stock', nullable: true })
  @IsNumber()
  @IsOptional()
  productStock!: number | null

  @Column('character varying', {
    name: 'product_brend',
    nullable: true,
    length: 50,
  })
  @IsNotEmpty({ message: 'Product brend is required' })
  productBrend!: string | null

  @Column('boolean', { name: 'product_isavailable', nullable: true })
  @IsBoolean({ message: 'Product is available must be a boolean' })
  @IsOptional()
  productIsavailable!: boolean | null

  @Column('boolean', { name: 'product_atdiscount', nullable: true })
  productAtdiscount!: boolean | null

  @Column('integer', { name: 'product_discount', nullable: true })
  @IsNumber({}, { message: 'Product discount must be a number' })
  @IsOptional()
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

  @RelationId((product: Products) => product.category)
  categoryId!: number
}
