import { Request, Response } from "express";
import { ethers } from "ethers";
import Token from "../../AMZToken.sol/AMZToken.json"

export async function purchaseController(req: Request, res: Response) {
  console.log("purchasing")
  //Receber produtos que foram comprados
  //Receber usuário que comprou e sua carteira metamask
  //const provider:any = req.body;
  const provider = new ethers.JsonRpcProvider()
  const tokenAddr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" //Could be the ENS
  const signer = await provider.getSigner()
  console.log(signer)
  //amount = (valor_total / 30) * (10^18)
  const amount: bigint = 1_000_000_000_000_000_000n;

  //Remover produtos do banco de dados
  //Adicionar cliente, produtos e outras informações da compra em outra tabela

  //Rodar contrato e transferir valor ao cliente
  const AMZContract = new ethers.Contract(tokenAddr, Token.abi, provider)
  await AMZContract.connect(signer).earnAMZ(signer, amount)

  return;
}

export async function goToCheckout(req: Request, res: Response) {
  //Receber o id dos produtos pela req

  //Consultar o valor dos produtos

  //Chamar api do stripe para criar um link de compra com o valor total consultado

  //Retornar link do stripe com e-mail, nome e telefone? (dados coletados no cadastro) já preenchidos
}