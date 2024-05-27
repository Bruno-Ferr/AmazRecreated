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
    $or: [
      { address: id },
      { email: id }
    ]
  })

  if(!userFromdb) return //avisar "User não encontrado"

  const user = {
    name: userFromdb.name,
    email: userFromdb.email
  }
  console.log(user)
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
  const {user} = req.body

  const userExists = await User.find({
    $or: [
      { address: user?.address },
      { email: user?.email }
    ]
  })

  if(userExists.length > 0) return res.status(400).send({message: "User already exists"})

  const infos = {
    ...user,
    address: user?.address || '',
    purchases: []
  }

  const data = new User(infos)
  data.save();

  return res.status(200).send({message: "User added"})
}