/* eslint-disable prettier/prettier */
import { Request, Response } from 'express'
import categoriesServices from '../services/categoriesServices'

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const data = await categoriesServices.getAllCategories()

    if (!data) {
      res.status(404).send('No Categories')
    }
    res.send(data)
  } catch (error) {
    res.status(500).send('There was an error !!!')
  }

  
  
}


const getCategoryById = async(req: Request, res: Response) => {
  console.log("Calling category by id")
  const categoryId = + req.params.id;
  try {
    const data = await categoriesServices.getCategoryById(categoryId);

    if(!data){
      res.status(404).send('There was no category');
    }

    res.send(data)
  } catch (error) {
    
    res.status(500).send(" There was an error");
  }


}

const updateCategory = async (req: Request, res: Response) => {
  console.log("radi");
}



export  { getAllCategories, getCategoryById, updateCategory }
