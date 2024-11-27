/* eslint-disable class-methods-use-this */
import Product from '../entities/Products'
import Categories from '../entities/Categories'

class ProductService {
  private product: Product[] = []

  // Stavlja se promise jer on obecava da ce se nesto vratiti i u njegov controller vracamo vrijednosti koje onda moramo awaitati
  getAllProducts(): Promise<Product[]> {
    return Product.find()
  }

  getProductById(id: number): Promise<Product | null> {
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
    updateProductData: UpdateProductData,
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
    productToUpdate.productTitle = productTitle ?? null
    productToUpdate.productDescription = productDescription ?? null
    productToUpdate.productRating = productRating ?? null
    productToUpdate.productStock = productStock ?? null
    productToUpdate.productIsavailable = productIsavailable ?? null
    productToUpdate.productAtdiscount = productAtdiscount ?? null
    productToUpdate.productDiscount = productDiscount ?? null
    productToUpdate.productBrend = productBrend ?? null
    productToUpdate.productCode = productCode ?? null

    if (categoryId !== undefined) {
      const category = await Categories.findOneBy({ categoryId })
      if (category) {
        productToUpdate.category = category
      } else {
        throw new Error('Category not found')
      }
    }
    return productToUpdate.save()
  }

  async createProduct(newProduct: any): Promise<Product[]> {
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
    product.category = newProduct.category
    await product.save()
    return [product]
  }

  async createMultipleProducts(
    products: Partial<Product>[],
  ): Promise<Product[]> {
    try {
      const multipleProducts = products.map((product) => {
        const newProduct = new Product()
        newProduct.productTitle = product.productTitle ?? null
        newProduct.productDescription =
          typeof product.productDescription === 'string'
            ? product.productDescription
            : null
        newProduct.productRating = product.productRating ?? null
        newProduct.productStock = product.productStock ?? null
        newProduct.productIsavailable = product.productIsavailable ?? null
        newProduct.productAtdiscount = product.productAtdiscount ?? null
        newProduct.productDiscount = product.productDiscount ?? null
        newProduct.productBrend = product.productBrend ?? null
        newProduct.productCode = product.productCode ?? null
        if (!product.categoryId) {
          throw new Error('Category ID is missing for a product.')
        }
        // Povezivanje s kategorijom
        newProduct.category = { categoryId: product.categoryId } as Categories
        return newProduct
      })
      // Čuvanje svih proizvoda
      const createdProducts = await Product.save(multipleProducts)
      return createdProducts
    } catch (error) {
      console.error('Error in createMultipleProducts:', error)
      throw new Error('Error creating multiple products.')
    }
  }
}
export default new ProductService()
