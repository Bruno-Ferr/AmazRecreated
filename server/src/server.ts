import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { purchaseController } from "./controller/purchase";
import cors from 'cors';

// configures dotenv to work in your application
dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3333;

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 

app.post("/purchase", purchaseController); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});