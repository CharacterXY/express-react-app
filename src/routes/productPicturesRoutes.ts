import express from 'express'
import productPicturesService from '../services/productPicturesService'
import {
  getAllPictures,
  getPicturesByProductId,
  saveProductPicture,
  saveProductPictures,
  deleteProductPictureById,
} from '../controllers/productPicturesController'

const router = express.Router()

/* router.get('', getAllPictures) */

router.get('/:productId', getPicturesByProductId)
router.post('/', saveProductPicture)
router.post('/save-multiple/:productId', saveProductPictures)
router.delete('/delete/:pictureId', deleteProductPictureById)

export default router
