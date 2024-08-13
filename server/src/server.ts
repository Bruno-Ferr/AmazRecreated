import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { goToCheckout, purchaseController, undoPurchase } from "./controller/purchase";
import cors from 'cors';
import { addProduct, findProduct, getProducts } from "./controller/products";
import { addClient, getClient, getClientBalance, getClientLastPurchase } from "./controller/client";
import mongoose, { Schema } from "mongoose";
import { ethers } from "ethers";
import contractABI from '../AMZToken/AMZToken.json'

const provider = new ethers.AlchemyProvider('sepolia', 's-vHBaDfU14XzTTkHoaYdhsGp3wKZtKT');
// configures dotenv to work in your application
dotenv.config();
mongoose.connect(process.env.MONGO_CONNECTION!)
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3333;

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 

app.post("/purchase", purchaseController); 
app.delete("/purchase/:id", undoPurchase); 
app.post("/createLink", goToCheckout); 
app.get("/products", getProducts); 
app.get("/products/find/:product_id", findProduct); 
app.get("/client/:id", getClient); 
app.get("/clientLastPurchase/:id", getClientLastPurchase); 
app.get("/clientBalance/:user_addr", getClientBalance);

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS!, contractABI, provider);
contract.on('Transfer', (prop) => {
  console.log(`Event received: ${prop}`);
});

app.post("/addProduct", addProduct); 
app.post("/addUser", addClient); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});