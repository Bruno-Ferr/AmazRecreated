import mongoose, { Schema } from "mongoose";
mongoose.connect(process.env.MONGO_CONNECTION!)

const ProductSchema = new Schema({
  id: String,
  name: String,
  brand: String,
  price: String,
  reviews: [{
    comment: String,
    stars: Number,
  }],
  image: [String],
  shippingFree: Boolean,
  discount: Number || false,
  amount: Number
})

export const Product = mongoose.model('Product', ProductSchema)

//Criar produtos fixos