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
import Products from './Products'
import Size from './Size'

@Index('product_sizes_pkey', ['productId', 'sizeId'], { unique: true })
@Entity('product_sizes', { schema: 'public' })
export default class ProductSizes extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'product_id' })
  productId!: number

  @Column('integer', { primary: true, name: 'size_id' })
  sizeId!: number

  @Column('integer', { name: 'stock', nullable: true })
  stock!: number | null

  @ManyToOne(() => Products, (products) => products.productSizes)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'productId' }])
  product!: Products

  @ManyToOne(() => Size, (size) => size.productSizes)
  @JoinColumn([{ name: 'size_id', referencedColumnName: 'sizeId' }])
  size!: Size
}
