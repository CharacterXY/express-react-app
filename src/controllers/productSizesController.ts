import { Request, Response } from 'express'
import productSizesService from '../services/productSizeService'
import ProductSizes from '../entities/ProductSizes'

const addOrUpdateProductSize = async (req: Request, res: Response) => {
  try {
    const { productId, sizeId, stock } = req.body
    await productSizesService.addOrUpdateProductSize(productId, sizeId, stock)
    return res.status(201).send('Product size added or updated.')
  } catch (error) {
    console.error('Error adding or updating product size:', error)
    return res
      .status(500)
      .send('There was an error adding or updating the product size.')
  }
}
