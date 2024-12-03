/* eslint-disable class-methods-use-this */
import { Repository } from 'typeorm'
import ProductSizes from '../entities/ProductSizes'
import AppDataSource from '../app-data-source'

class ProductSizesService {
  private productSizesRepository: Repository<ProductSizes>

  constructor() {
    this.productSizesRepository = AppDataSource.getRepository(ProductSizes)
  }

  // Adding a size to a product
  async addOrUpdateProductSize(
    productId: number,
    sizeId: number,
    stock: number,
  ) {
    const productSize = await this.productSizesRepository.findOne({
      where: { productId, sizeId },
    })

    if (productSize) {
      productSize.stock = stock
      this.productSizesRepository.save(productSize)
    } else {
      const newProductSize = this.productSizesRepository.create({
        productId,
        sizeId,
        stock,
      })
      this.productSizesRepository.save(newProductSize)
    }
  }
}

export default new ProductSizesService()
