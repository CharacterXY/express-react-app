/* eslint-disable class-methods-use-this */
import ProductPictures from '../entities/ProductPictures'

class ProductPicturesService {
  private productPictures: ProductPictures[] = []

  getAllPictures(): Promise<ProductPictures | undefined> {
    return ProductPictures.findOneBy({ pictureId: id })
  }
}


export default new ProductPicturesService()
