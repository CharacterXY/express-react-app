import { Request, Response, NextFunction } from 'express'
import productPicturesService from '../services/productPicturesService'
import ProductPictures from '../entities/ProductPictures'

const getAllPictures = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pictures = await productPicturesService.getAllPictures()
    return res.status(200).send(pictures)
  } catch (error) {
    next(error)
    return res.status(404).send('No pictures found')
  }
}

const getPicturesByProductId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = +req.params.productId
    const pictures =
      await productPicturesService.getPicturesByProductId(productId)
    if (pictures) res.status(200).send(pictures)
  } catch (error) {
    res.status(404).send('No pictures found')
  }
}

const saveProductPicture = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { pictureUrl, productId } = req.body
    console.log('data', pictureUrl, productId)
    await productPicturesService.saveProductPicture(productId, pictureUrl)
    res.status(201).send('Picture saved successfully')
  } catch (error) {
    res.status(400).send('Error saving picture')
    next(error)
  }
}

const saveProductPictures = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId, pictureUrls } = req.body

    // Validation of pictureUrls
    if (!productId || !pictureUrls || !Array.isArray(pictureUrls)) {
      res
        .status(400)
        .send(
          'Invalid request body. Must include productId and pictureUrls as an array.',
        )
    }
    const pictures = await productPicturesService.saveProductPictures(
      pictureUrls,
      productId,
    )

    if (pictures) {
      res.status(201).send('Pictures saved successfully')
    } else {
      res.status(400).send('Error saving pictures')
    }
  } catch (error) {
    res.status(400).send('Error saving pictures')
    next(error)
  }
}

const deleteProductPictureById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pictureId = +req.params.pictureId
    const deletedPicture = req.body
    await productPicturesService.deleteProductPictureById(pictureId)
    res.status(200).send(deletedPicture)
  } catch (error) {
    res.status(404).send('Picture not found')
    next(error)
  }
}

export {
  getAllPictures,
  getPicturesByProductId,
  saveProductPicture,
  saveProductPictures,
  deleteProductPictureById,
}
