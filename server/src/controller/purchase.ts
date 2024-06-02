import { Request, Response } from "express";
import { ethers } from "ethers";
import Token from "../../AMZToken.sol/AMZToken.json"
import { findProductDB } from "../database/productsDb";
import { earnAMZ, seeBalance } from "../contract";
import fs from 'fs'
import { User } from "../database/models/user";
import { Product } from "../database/models/products";
import { Booking } from "../database/models/booking";

interface purchaseResponse {
  message: string
  balance?: string
}

export async function purchaseController(req: Request, res: Response) {
  const {userAddr, purchase} = req.body

  if(!userAddr) return res.status(404).send({message: 'Connect to your wallet and try again'})
  //Usuário precisa estar cadastrado para comprar (checagem)
  
  try {    
    let totalPrice = 0
    const productsFromDb = await Promise.all(purchase.map(async (item: any) => {
      const foundProduct = await Product.findOne({ id: item.product.id });
      if (!foundProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      if(item.amount > foundProduct.amount!) {
        return res.status(404).json({ message: "Product doesn't have enough amount" });
      }
      totalPrice = (item.amount * foundProduct.price!) + totalPrice
      return {
        id: foundProduct.id,
        name: foundProduct.name,
        brand: foundProduct.brand,
        price: foundProduct.price,
        shippingFree: foundProduct.shippingFree,
        discount: foundProduct.discount,
        amount: item.amount
      }
    }));

    await Promise.all(productsFromDb.map(async (item: any) => {
      await Product.findOneAndUpdate({ id: item.id },{ $inc: { amount: -item.amount }}); //Remove amount
      const book = new Booking({products: item, userAddress: userAddr, tax: 0, totalPrice, date: new Date()})
      book.save();
    }));

    return res.status(200).send({message: "Transaction successfully", totalPrice});
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