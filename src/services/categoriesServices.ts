/* eslint-disable class-methods-use-this */

import Categories from '../entities/Categories'

class CategoriesService {
  private categories: Categories[] = []

  getAllCategories(): Promise<Categories[]> {
    return Categories.find()
  }

  getCategoryById(id: number): Promise<Categories | undefined> {
    return Categories.findOneBy({ categoryId: id })
  }

  async updateCategory(
    id: number,
    updateCategoryData: string,
  ): Promise<Categories | undefined> {
    const currentCategory = await Categories.findOneBy({ categoryId: id })

    if (!currentCategory) {
      return undefined
    }

    const { categoryId, categoryName } = updateCategoryData

    currentCategory.categoryId = categoryId
    currentCategory.categoryName = categoryName

    currentCategory.save()
    return currentCategory
  }
}
export default new CategoriesService()
