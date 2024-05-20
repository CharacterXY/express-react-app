import express from 'express'
import productPicturesService from '../services/productPicturesService'
import { getAllPictures } from '../controllers/productPicturesController'

const router = express.Router()

router.get('', getAllPictures)

export default router
