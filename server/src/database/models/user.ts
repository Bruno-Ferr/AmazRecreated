import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  address: String,
  email: String,
  purchases: [{
    products: [{
      id: String,
      name: String,
      brand: String,
      price: Number,
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