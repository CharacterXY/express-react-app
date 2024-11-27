/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm'
import path from 'path'
import ProductPictures from './entities/ProductPictures'
import Products from './entities/Products'
import Cart from './entities/Cart'
import CartItems from './entities/CartItems'
import Categories from './entities/Categories'
import ProductSizes from './entities/ProductSizes'
import Users from './entities/Users'
import Size from './entities/Size'

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'web_shop',
  /*   entities: [path.join(__dirname, 'src/entities/*.ts')], */
  entities: [
    ProductPictures,
    Products,
    Cart,
    CartItems,
    Categories,
    ProductSizes,
    Users,
    Size,
  ],
  migrations: ['src/migration/*.ts'],
})
