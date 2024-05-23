import mongoose, { Schema } from "mongoose";
mongoose.connect(process.env.MONGO_CONNECTION!)

const UserSchema = new Schema({
  id: String,
  name: String,
  address: String,
  email: String,
  purchases: [{
    products: [{
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
      discount: Number || false
    }],
    tax: Number,
    amz: Number,
    totalPrice: Number
  }]
})

export const User = mongoose.model('User', UserSchema)