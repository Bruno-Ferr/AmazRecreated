import { Request, Response } from "express";
import { readDB } from "../database/productsDb";

export function getProducts(req: Request, res: Response) {
  const products = readDB()

  return res.status(200).json(products)
}