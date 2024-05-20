import { Request, Response } from 'express'
import sizeService from '../services/sizeService'
import Size from '../entities/Size'

const getAllSizes = async (req: Request, res: Response) => {
  res.send(await sizeService.getAllSizes())
}

const getSizeById = async (req: Request, res: Response) => {
  try {
    const size = await sizeService.getSizeById(
      Number.parseInt(req.params.id, 10),
    )

    if (!size) {
      return res.status(404).send('Size not found')
    }

    return res.send(size)
  } catch (error) {
    res.status(500).send('There was an error retriving size')
  }
}

const updateSize = async (req: Request, res: Response) => {
  const sizeId = +req.params.id
  const newSize = req.body

  try {
    let sizeToUpdate = await sizeService.getSizeById(sizeId)

    if (!sizeToUpdate) {
      return res.status(404).send('There no size to update !')
    }

    sizeToUpdate = Size.merge(sizeToUpdate, newSize)
    await sizeToUpdate.save()

    const updatedSize = await sizeService.updateSize(sizeId, sizeToUpdate)
    return res.send(updatedSize)
  } catch (error) {
    return res.status(500).send('There was an error during modifying size')
  }
}

const createSize = async (req: Request, res: Response) => {
  try {
    const newSize = req.body as Size
    res.send(await sizeService.createSize(newSize))
  } catch (error) {
    return res.status(500).send('There was an error')
  }
}

export { getAllSizes, getSizeById, updateSize, createSize }
