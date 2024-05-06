/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Products from './Products'

@Index('categories_pkey', ['categoryId'], { unique: true })
@Entity('categories', { schema: 'public' })
export default class Categories extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'category_id' })
  categoryId!: number

  @Column('character varying', {
    name: 'category_name',
    nullable: true,
    length: 50,
  })
  categoryName!: string | null

  @OneToMany(() => Products, (products) => products.category)
  products!: Products[]
}
