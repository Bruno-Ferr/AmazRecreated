import { Request, Response } from "express";
import { ethers } from "ethers";
import Token from "../../AMZToken.sol/AMZToken.json"
import { findProductDB } from "../database/productsDb";

export async function purchaseController(req: Request, res: Response) {
  //Receber produtos que foram comprados
  //Receber usuário que comprou e sua carteira metamask
  //const provider:any = req.body;
  const {userAddr, products} = req.body

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

    const provider = new ethers.JsonRpcProvider() //Trocar para o provedor da rede utilizada
    const tokenAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3" //Could be the ENS; Salvo no env
    const someoneAddr = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" //Recebido do front end

    const signer = await provider.getSigner(someoneAddr)
    const owner = await provider.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    
    const big: bigint = 1_000_000_000_000_000_000n;
    // console.log(total / 50)
    //const amount = ethers.formatUnits(total / 50, "wei")
    const amount = ethers.parseEther('17.98')

    const wasteAmount: bigint = 1_000_000_000_000_000_000n;

    //Rodar contrato e transferir valor ao cliente
    const AMZContract = new ethers.Contract(tokenAddr, Token.abi, provider)
    await AMZContract.connect(owner).earnAMZ(signer, amount)
    //await AMZContract.connect(signer).wasteAMZ(wasteAmount)

    //Atualizar a tabela de comprar com status para "pago"
    return res.status(200).send({message: "Transaction successfully"});
  } catch (err) {
    console.log(err)
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