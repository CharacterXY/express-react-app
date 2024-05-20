import express, { Request, Response } from 'express'
import categoriesServices from '../services/categoriesServices'
import {
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/categoriesController'

const router = express.Router()

router.get('/', getAllCategories)
router.get('/:id', getCategoryById)
router.patch('/update/:id', updateCategory)

export default router
