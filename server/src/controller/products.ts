import { Request, Response } from "express";
import { addProductToDB, findProductDB, readDB } from "../database/productsDb";
import { Product } from "../database/models/products";

export async function getProducts(req: Request, res: Response) {
  //const result = readDB()
  const products = await Product.find()

  return res.status(200).json(products)
}

export async function findProduct(req: Request, res: Response) {
  //const product = findProductDB(1)
  const {product_id} = req.params
  const product = await Product.findOne({ id: product_id})

  return res.status(200).json(product)
}

export async function addProduct(req: Request, res: Response) {
  const {product} = req.body;

  await addProductToDB(product);

  return res.status(200).send({message: "Product added"})
}