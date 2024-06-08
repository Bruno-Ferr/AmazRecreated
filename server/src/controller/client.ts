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

  const [userFromdb] = await User.find({
    address: id
  })

  if(!userFromdb) return res.status(404).send('User not found') //avisar "User não encontrado"/redirect to signup

  const user = {
    name: userFromdb.name
  }

  return res.status(200).json({user})
}

export async function getClientPurchases(req: Request, res: Response) {}

export async function getClientLastPurchase(req: Request, res: Response) {
  const {id} = req.params

  //const purchase = await userLastPurchaseDB(email)
  const [userFromdb] = await User.find({id: id})
  const lastPurchase = userFromdb.purchases[0] //deve ser o tamanho de purchases. Ao salvar, deve ser tamanho de purchases o id das purchases

  return res.status(200).json({lastPurchase})
}

export async function getClientBalance(req: Request, res: Response) { //Essa pode ser uma interação pelo front end mesmo
  const {user_addr} = req.params

  const balance = await seeBalance(user_addr)

  return res.status(200).send(ethers.formatEther(balance))
}

export async function addClient(req: Request, res: Response) {
  const {userName, userAddress} = req.body

  const userExists = await User.find({
    address: userAddress
  })

  if(userExists.length > 0) return res.status(400).send({message: "User already exists"})

  const infos = {
    name: userName,
    address: userAddress,
    purchases: []
  }

  const data = new User(infos)
  data.save();

  return res.status(200).send({message: "User added"})
}