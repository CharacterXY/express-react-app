// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from 'express'
import {
  getAllSizes,
  getSizeById,
  updateSize,
  createSize,
} from '../controllers/sizeController'

const router = express.Router()

router.get('', getAllSizes)

router.get('/:id', getSizeById)

router.patch('/:id', updateSize)

router.post('', createSize)

export default router
