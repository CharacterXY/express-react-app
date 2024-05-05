import { Request, Response } from 'express'
import productService from '../services/productService'
import Product from '../entities/Products'
import { merge } from 'lodash'

const getAllProducts = async (req: Request, res: Response) => {
  res.send(await productService.getAllProducts())
}

const getProductById = async (req: Request, res: Response) => {
  res.send(
    await productService.getProductById(Number.parseInt(req.params.id, 10)),
  )
}

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body as Product
    res.send(await productService.createProduct(newProduct))
  } catch (error) {
    res.status(500).send('There was an error')
  }
}
const updateProduct = async (req: Request, res: Response) => {
  const productId = +req.params.id
  const newProduct = req.body

  try {
    const currentData = await productService.getProductById(productId)
    const updatedProductData = merge({}, currentData, newProduct)

    if (productId && newProduct) {
      res.send(
        await productService.updateProduct(productId, updatedProductData),
      )
    }
  } catch (error) {
    res.status(500).send('There was an error during modified product')
  }
}

const deleteProductById = async (req: Request, res: Response) => {
  res.send(
    await productService.deleteProductById(Number.parseInt(req.params.id, 10)),
  )
}

export {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProduct,
}
