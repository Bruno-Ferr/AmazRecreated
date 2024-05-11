import { Request, Response } from "express";
import { findProductDB, readDB } from "../database/productsDb";

export function getProducts(req: Request, res: Response) {
  const products = readDB()

  return res.status(200).json(products)
}

export function findProduct(req: Request, res: Response) {
  const product = findProductDB(1)

  return res.status(200).json(product)
}