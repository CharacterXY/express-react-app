// src/index.js
import express, { Express } from 'express'
import 'reflect-metadata'

import dataSource from './app-data-source'
import homeRoutes from './routes/homeRoutes'
import productRoutes from './routes/productRoutes'
import categoriesRoutes from './routes/categoriesRoutes'
import cartRoutes from './routes/cartRoutes'
import sizeRoutes from './routes/sizeRoutes'
import errorHandler from './middlewares/errorHandler'
import productPicturesRoutes from './routes/productPicturesRoutes'

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(errorHandler)
app.use(express.static('public'))

app.use('/', homeRoutes)
// app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/categories', categoriesRoutes)
app.use('/sizes', sizeRoutes)
app.use('/product-pictures', productPicturesRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
