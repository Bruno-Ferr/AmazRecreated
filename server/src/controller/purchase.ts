import { Request, Response } from "express";
import { ethers } from "ethers";
import Token from "../../AMZToken.sol/AMZToken.json"
import { findProductDB } from "../database/productsDb";
import { earnAMZ, seeBalance } from "../contract";
import fs from 'fs'

export async function purchaseController(req: Request, res: Response) {
  //Receber produtos que foram comprados
  //Receber usuário que comprou e sua carteira metamask
  //const provider:any = req.body;
  const {userAddr, products, userEmail} = req.body

  try {
    let total = 0;
    //Consultar o valor dos produtos e se estão disponíveis no banco
    products.map((product: any) => {
      const data = findProductDB(product.id)
      const isInStock = data.availability >= product.amount
      if(isInStock) {
        total += data.price * product.amount
      } else {
        return res.status(400).send({message: "We don't have more this product in stock!"})
      }
    }) 
    const value = (total/50).toString()
    await earnAMZ(userAddr, value)

    const balance = await seeBalance(userAddr)
    //Atualizar a tabela de comprar com status para "pago"
    const info = {
      user: userEmail || 'johnDoe@gmail.com',
      status: 'payed',
      products,
      total,
      AMZEarned: value
    }

    const data = JSON.stringify(info)
    fs.writeFile("./db/purchase.json", data, (error) => {
      if(error) {
        console.log(error)
      }
    })
    return res.status(200).send({message: "Transaction successfully", balance: ethers.formatEther(balance)});
  } catch (err) {
    throw new Error("Something went wrong earn AMZ")
  }
}

export async function goToCheckout(req: Request, res: Response) {
  //Receber o id dos produtos pela req
  const {products} = req.body
  try {
    let total = 0;
    //Consultar o valor dos produtos e se estão disponíveis no banco
    products.map((product: any) => {
      const data = findProductDB(product.id)
      const isInStock = data.availability >= product.amount
      if(isInStock) {
        total += data.price * product.amount
      } else {
        return res.status(400).send({message: "We don't have more this product in stock!"})
      }
    }) 

    //Remover produtos do banco de dados
    //Adicionar cliente, produtos e outras informações da compra em outra tabela
    //Nessa tabela o status será "aguardando pagamento"
  
    //Chamar api do stripe para criar um link de compra com o valor total consultado
  
    //Retornar link do stripe com e-mail, nome e telefone? (dados coletados no cadastro) já preenchidos
    return res.status(200).json({total})
  } catch (error) {
    //return res.status(400).send({message: "Something went wrong!"})
  }

}