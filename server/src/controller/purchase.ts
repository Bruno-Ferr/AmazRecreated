import { Request, Response } from "express";
import { ethers } from "ethers";
import Token from "../../AMZToken.sol/AMZToken.json"
import { findProductDB } from "../database/productsDb";
import { earnAMZ, seeBalance } from "../contract";
import fs from 'fs'
import { User } from "../database/models/user";

interface purchaseResponse {
  message: string
  balance?: string
}

export async function purchaseController(req: Request, res: Response) {
  //Receber produtos que foram comprados
  //Receber usuário que comprou e sua carteira metamask
  //const provider:any = req.body;
  const {userAddr, purchase} = req.body

  const returnData: purchaseResponse = {
    message: "Transaction successfully", 
  }
  
  try {    
    const newPosition = 0; //Beginning of the array
    await User.findOneAndUpdate(
      { address: userAddr },
      { $push: { purchases: { $each: [purchase], $position: newPosition } } },
      { new: true }
    );

    return res.status(200).send({message: "Transaction successfully", balance: ethers.formatEther(0)});
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



// let total = 0;
//     //Consultar o valor dos produtos e se estão disponíveis no banco
//     products.map((product: any) => {
//       const data = findProductDB(product.id)
//       const isInStock = data.availability >= product.amount
//       if(isInStock) {
//         total += data.price * product.amount
//       } else {
//         return res.status(400).send({message: "We don't have more this product in stock!"})
//       }
//     }) 
//     const value = (total/50).toString()
//     let balance = 0;
//     if(userAddr) {
//       await earnAMZ(userAddr, value)
//       balance = await seeBalance(userAddr)
//       returnData.balance = ethers.formatEther(balance)
//     }

//     //Atualizar a tabela de comprar com status para "pago"
//     const info = {
//       user: userEmail || 'JohnDoe@gmail.com',
//       status: 'payed',
//       products,
//       total,
//       AMZEarned: userAddr ? value : 0
//     }

//     fs.readFile("./db/purchases.json", (error, existingData: any) => {
//       if (error) {
//         console.error('Error reading file:', error);
//         return;
//       }
    
//       let purchases = [];
//       if (existingData) {
//         try {
//           // Parse existing JSON data
//           purchases = JSON.parse(existingData).purchases;
//         } catch (parseError) {
//           console.error('Error parsing JSON:', parseError);
//           return;
//         }
//       }

//       // Add new data to existing purchases
//       purchases.push(info);

//       // Update the main data object
//       const data = { purchases };

//       // Convert data to JSON format
//       const jsonData = JSON.stringify(data);

//       // Append new data to file
//       fs.writeFile("./db/purchases.json", jsonData, (writeError) => {
//         if (writeError) {
//           console.error('Error appending file:', writeError);
//         } else {
//           console.log('Data appended successfully.');
//         }
//       });
//     });