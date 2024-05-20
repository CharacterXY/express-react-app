/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable prettier/prettier */

import { Request, Response } from 'express'
import productService from '../services/productService'
import Product from '../entities/Products'

const getAllProducts = async (req: Request, res: Response) => {
  res.send(await productService.getAllProducts())
}

// eslint-disable-next-line consistent-return
const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(
      Number.parseInt(req.params.id, 10),
    )
    if (!product) {
      return res.status(404).send('Product not found')
    }
    res.send(product)
  } catch (error) {
    res.status(500).send('There was an error retriving the product')
  }
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
    let productToUpdate = await productService.getProductById(productId)

    if (!productToUpdate) {
      return res.status(404).send('Product was not found')
    }
    //
    productToUpdate = Product.merge(productToUpdate, newProduct)
    await productToUpdate.save()

    const updatedProduct = await productService.updateProduct(
      productId,
      productToUpdate,
    )
    return res.send(updatedProduct)
  } catch (error) {
    return res.status(500).send('There was an error during modifying product')
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
