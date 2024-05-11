import { Request, Response } from "express";
import { ethers } from "ethers";
import Token from "../../AMZToken.sol/AMZToken.json"

export async function getClient(req: Request, res: Response) {
  const provider = new ethers.JsonRpcProvider()
  const tokenAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3" //Could be the ENS; Salvo no env
  const someoneAddr = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" //Recebido do front end

  const signer = await provider.getSigner(someoneAddr)
  const AMZContract = new ethers.Contract(tokenAddr, Token.abi, provider)

  const balance = await AMZContract.connect(signer).seeBalance()

  const user = {
    email: 'JohnDoe@gmail.com',
    name: 'John Doe',
    balance
  }

  return res.status(200).json({user})
}