import { Repository } from 'typeorm'
import ProductPictures from '../entities/ProductPictures'
import Products from '../entities/Products'
import AppDataSource from '../app-data-source'

class ProductPicturesService {
  private productPicturesRepository: Repository<ProductPictures>

  constructor() {
    this.productPicturesRepository =
      AppDataSource.getRepository(ProductPictures)
  }

  // Fetches pictures by product ID
  async getPicturesByProductId(productId: number): Promise<ProductPictures[]> {
    return this.productPicturesRepository.find({ where: { productId } })
  }

  // Fetches all pictures
  async getAllPictures(): Promise<ProductPictures[]> {
    return this.productPicturesRepository.find()
  }

  // Save picture to database
  async saveProductPicture(productId: number, pictureUrl: string) {
    // Firstly fetch the product by ID
    const product = await this.productPicturesRepository.manager
      .getRepository(Products)
      .findOneBy({ productId })
    // Check if product exists
    if (!product) {
      throw new Error('Product not found')
    }
    const productPicture = new ProductPictures()
    productPicture.product = product
    productPicture.pictureUrl = pictureUrl
    return this.productPicturesRepository.save(productPicture)
  }

  // Save multiple pictures to database
  async saveProductPictures(productId: number, pictureUrls: Array<string>) {
    console.log('data', productId, pictureUrls)
    const productPictures = pictureUrls.map((pictureUrl) => {
      const productPicture = new ProductPictures()
      productPicture.productId = productId
      productPicture.pictureUrl = pictureUrl

      return productPicture
    })
    return this.productPicturesRepository.save(productPictures)
  }

  // Delete picture by ID
  async deleteProductPictureById(pictureId: number) {
    return this.productPicturesRepository.delete(pictureId)
  }
}

export default new ProductPicturesService()
