import express, { Request, Response } from 'express'
import productService from '../services/productService'
import {
  createProduct,
  updateProduct,
  createMultipleProducts,
  countAllProducts,
  getProductsWithPagination,
} from '../controllers/productController'

const router = express.Router()

router.get('', async (req: Request, res: Response) => {
  const product = await productService.getAllProducts()
  res.send(product)
})
router.get('/count', countAllProducts)

router.get('/pagination', getProductsWithPagination)

router.get('/:id', async (req: Request, res: Response) => {
  const productId = +req.params.id
  const product = await productService.getProductById(productId)
  if (product) {
    res.send(product)
  } else {
    res.status(404).send('Product not found')
  }
})

router.delete('/delete/:id', async (req: Request, res: Response) => {
  const productId = +req.params.id

  try {
    const deletedProduct = await productService.deleteProductById(productId)

    if (deletedProduct) {
      res.status(200).send({
        message: `Product was deletes sucessfully with ${productId}`,
        deletedProduct,
      })
    } else {
      res.status(400).send('Product was not found')
    }
  } catch (error) {
    res.status(500).send('error deleting product')
  }
})

router.post('', async (req, res, next) => {
  try {
    await createProduct(req, res)
  } catch (error) {
    next(error)
  }
})

router.post('/bulk', async (req, res, next) => {
  console.log('Bulk POST route hit')
  console.log('Request body:', req.body)
  try {
    await createMultipleProducts(req, res)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    await updateProduct(req, res)
  } catch (error) {
    next(error)
  }
})
export default router
