/* eslint-disable class-methods-use-this */
import Size from '../entities/Size'

class SizeService {
  private size: Size[] = []

  getAllSizes(): Promise<Size[]> {
    return Size.find()
  }

  getSizeById(id: number): Promise<Size | undefined> {
    return Size.findOneBy({ sizeId: id })
  }

  async createSize(newSize: any): Promise<Size | undefined> {
    const size = new Size()
    size.sizeName = newSize.sizeName

    await size.save()
    return size
  }

  async updateSize(
    id: number,
    updateSizeData: Size,
  ): Promise<Size | undefined> {
    const sizeToUpdate = await Size.findOneBy({ sizeId: id })

    if (!sizeToUpdate) {
      return undefined
    }

    const { sizeName } = updateSizeData

    sizeToUpdate.sizeName = sizeName

    await sizeToUpdate.save()
    return sizeToUpdate
  }
}

export default new SizeService()
