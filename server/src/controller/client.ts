import { Request, Response } from "express";
import { ethers } from "ethers";
import { seeBalance } from "../contract";
import { userLastPurchaseDB } from "../database/purchaseDb";
import { User } from "../database/models/user";

interface UserProps {
  email: string;
  name: string;
  balance?: string; // Make balance property optional
}

export async function getClient(req: Request, res: Response) {
  const {id} = req.params
  //pegar do mongo

  const userFromdb = await User.find({address: id})

  return res.status(200).json({userFromdb})
}

export async function getClientPurchases(req: Request, res: Response) {}

export async function getClientLastPurchase(req: Request, res: Response) {
  const {id} = req.params

  //const purchase = await userLastPurchaseDB(email)
  const [userFromdb] = await User.find({id: id})
  const lastPurchase = userFromdb.purchases[0]
  //pegar do mongo

  return res.status(200).json({lastPurchase})
}

export async function getClientBalance(req: Request, res: Response) { //Essa pode ser uma interação pelo front end mesmo
  const {user_addr} = req.params

  const balance = await seeBalance(user_addr)

  return res.status(200).send(ethers.formatEther(balance))
}

export async function addClient(req: Request, res: Response) {
  const {user} = req.body

  const data = new User(user)
  data.save();

  return res.status(200).send({message: "User added"})
}