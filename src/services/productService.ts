/* eslint-disable class-methods-use-this */
import Product from '../entities/Products'
//import HttpError from '../utils/HttpError'

class ProductService {
  private product: Product[] = []

  // Stavlja se promise jer on obecava da ce se nesto vratiti i u njegov controller vracamo vrijednosti koje onda moramo awaitati
  getAllProducts(): Promise<Product[]> {
    return Product.find()
  }

  getProductById(id: number): Promise<Product | undefined> {
    return Product.findOneBy({ productId: id })
  }

  // Ovdje brisemo produkte prema ID-u koji prosljedivamo.
  async deleteProductById(id: number): Promise<Product | undefined> {
    const indexToDelete = await Product.findOneBy({ productId: id })
    if (!indexToDelete) {
      return undefined
    }

    await Product.remove(indexToDelete)
    return indexToDelete
  }

  async updateProduct(
    id: number,
    updateProductData: any,
  ): Promise<Product | undefined> {
    const productToUpdate = await Product.findOneBy({ productId: id })

    if (!productToUpdate) {
      return undefined
    }

    const {
      productTitle,
      productDescription,
      productRating,
      productStock,
      productIsavailable,
      productAtdiscount,
      productDiscount,
      productBrend,
      productCode,
      categoryId,
    } = updateProductData

    productToUpdate.productTitle = productTitle
    productToUpdate.productDescription = productDescription
    productToUpdate.productRating = productRating
    productToUpdate.productStock = productStock
    productToUpdate.productIsavailable = productIsavailable
    productToUpdate.productAtdiscount = productAtdiscount
    productToUpdate.productDiscount = productDiscount
    productToUpdate.productBrend = productBrend
    productToUpdate.productCode = productCode
    productToUpdate.categoryId = categoryId

    await productToUpdate.save()

    return productToUpdate
  }

  async createProduct(newProduct: any): Promise<Product> {
    const product = new Product()
    product.productTitle = newProduct.productTitle
    product.productDescription = newProduct.productDescription
    product.productRating = newProduct.productRating
    product.productStock = newProduct.productStock
    product.productIsavailable = newProduct.productIsavailable
    product.productAtdiscount = newProduct.productAtdiscount
    product.productDiscount = newProduct.productDiscount
    product.productBrend = newProduct.productBrend
    product.productCode = newProduct.productCode
    product.categoryId = newProduct.categoryId

    await product.save()
    return product
  }
}
export default new ProductService()
