import { Request, Response } from 'express'
import productPicturesService from '../services/productPicturesService'
import ProductPictures from '../entities/ProductPictures'


export const getAllPictures = async (req:Request, res: Response) => {
    res.send(await productPicturesService.getAllPictures)
}

