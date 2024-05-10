/* eslint-disable prettier/prettier */
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

@Index('product_pictures_pkey', ['pictureId'], { unique: true })
@Entity('product_pictures', { schema: 'public' })
export default class ProductPictures extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'picture_id' })
  pictureId!: number

  @Column('character varying', {
    name: 'picture_url',
    nullable: true,
    length: 255,
  })
  pictureUrl!: string | null

  @ManyToOne(() => Products, (products) => products.productPictures)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'productId' }])
  product!: Products
}
