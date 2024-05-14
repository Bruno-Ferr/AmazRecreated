import { Request, Response } from "express";
import { ethers } from "ethers";
import { seeBalance } from "../contract";

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