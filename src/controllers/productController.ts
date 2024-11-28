/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable prettier/prettier */

import { Request, Response } from 'express'
import productService from '../services/productService'
import Product from '../entities/Products'

const getAllProducts = async (req: Request, res: Response) => {
  return res.send(await productService.getAllProducts())
}

const countAllProducts = async (req: Request, res: Response) => {
  try {
    const total = await productService.countAllProducts()
    res.status(200).json({ total })
  } catch (error) {
    res.status(500).json({ error: 'Failed to count products.' })
  }
}

const getProductsWithPagination = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 6
    const products = await productService.getProductsWithPagination(page, limit)
    res.status(200).send(products)
  } catch (error) {
    console.error('Error in pagination controller:', error)
    res.status(500).send('Error retrieving products with pagination')
  }
}

// eslint-disable-next-line consistent-return
const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id)
    // Validacija ID-a
    if (Number.isNaN(productId)) {
      return res.status(400).send('Invalid product ID')
    }
    const product = await productService.getProductById(productId)
    if (!product) {
      return res.status(404).send('Product not found')
    }
    return res.status(200).send(product)
  } catch (error) {
    console.error('Error retrieving product by ID:', error)
    return res.status(500).send('There was an error retrieving the product.')
  }
}

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = req.body as Product
    return res.send(await productService.createProduct(newProduct))
  } catch (error) {
    return res.status(500).send('There was an error')
  }
}

const createMultipleProducts = async (req: Request, res: Response) => {
  try {
    const products = req.body
    console.log('Request body:', req.body)

    if (!Array.isArray(products)) {
      return res
        .status(400)
        .send('Invalid body format. It should be an array of products.')
    }

    products.forEach((product, index) => {
      console.log(`Product ${index}:`, product)
    })

    // Poziva servis za obradu logike
    const createdProducts =
      await productService.createMultipleProducts(products)

    return res.status(201).send(createdProducts)
  } catch (error) {
    console.error('Error in createMultipleProducts:', error)
    return res
      .status(500)
      .send({ message: 'There was an error creating products.' })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  const productId = +req.params.id
  const newProduct = req.body
  try {
    const productToUpdate = await productService.getProductById(productId)
    if (!productToUpdate) {
      return res.status(404).send('Product was not found')
    }
    // Azuriranje proizvoda pozivom servisa
    const updatedProduct = await productService.updateProduct(
      productId,
      newProduct,
    )
    return res.status(200).send(updatedProduct)
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
  createMultipleProducts,
  countAllProducts,
  getProductsWithPagination,
}
