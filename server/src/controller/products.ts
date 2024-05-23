import { Request, Response } from "express";
import { findProductDB, readDB } from "../database/productsDb";
import { Product } from "../database/models/products";

export async function getProducts(req: Request, res: Response) {
  //const result = readDB()
  const products = await Product.find()

  return res.status(200).json(products)
}

export async function findProduct(req: Request, res: Response) {
  const product = findProductDB(1)

  return res.status(200).json(product)
}