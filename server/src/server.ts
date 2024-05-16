import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { goToCheckout, purchaseController } from "./controller/purchase";
import cors from 'cors';
import { findProduct, getProducts } from "./controller/products";
import { getClient, getClientBalance, getClientLastPurchase } from "./controller/client";

// configures dotenv to work in your application
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3333;

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 

app.post("/purchase", purchaseController); 
app.post("/createLink", goToCheckout); 
app.get("/products", getProducts); 
app.get("/products/find", findProduct); 
app.get("/client/:id", getClient); 
app.get("/clientLastPurchase/:email", getClientLastPurchase); 
app.get("/clientBalance/:userAddr", getClientBalance); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});