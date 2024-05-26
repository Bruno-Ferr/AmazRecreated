import { Request, Response } from "express";
import { ethers } from "ethers";
import { seeBalance } from "../contract";
import { userLastPurchaseDB } from "../database/purchaseDb";
import { User } from "../database/models/user";

interface User {
  email: string;
  name: string;
  balance?: string; // Make balance property optional
}

export async function getClient(req: Request, res: Response) {
  const {id} = req.params
  //pegar do mongo

  const userFromdb = await User.find({address: id})

  let user: User = {
    email: 'JohnDoe@gmail.com',
    name: 'John Doe',
  }

  if(id) {
    const balance = await seeBalance(id)
    user.balance = ethers.formatEther(balance)
  } 

  return res.status(200).json({user})
}

export async function getClientPurchases(req: Request, res: Response) {}

export async function getClientLastPurchase(req: Request, res: Response) {
  const {email} = req.params

  const purchase = await userLastPurchaseDB(email)
  //pegar do mongo

  return res.status(200).json({purchase})
}

export async function getClientBalance(req: Request, res: Response) { //Essa pode ser uma interação pelo front end mesmo
  const {user_addr} = req.params

  const balance = await seeBalance(user_addr)

  return res.status(200).send(ethers.formatEther(balance))
}