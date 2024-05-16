import { Request, Response } from "express";
import { ethers } from "ethers";
import { seeBalance } from "../contract";
import { userLastPurchaseDB } from "../database/purchaseDb";

interface User {
  email: string;
  name: string;
  balance?: string; // Make balance property optional
}

export async function getClient(req: Request, res: Response) {
  const {userAddr} = req.params

  let user: User = {
    email: 'JohnDoe@gmail.com',
    name: 'John Doe',
  }

  if(userAddr) {
    const balance = await seeBalance(userAddr)
    user.balance = ethers.formatEther(balance)
  } 

  return res.status(200).json({user})
}

export async function getClientPurchases(req: Request, res: Response) {}

export async function getClientLastPurchase(req: Request, res: Response) {
  const {email} = req.params

  const purchase = await userLastPurchaseDB(email)

  return res.status(200).json({purchase})
}

export async function getClientBalance(req: Request, res: Response) { //Essa pode ser uma interação pelo front end mesmo
  const {userAddr} = req.params

  const balance = await seeBalance(userAddr)

  return res.status(200).send(ethers.formatEther(balance))
}