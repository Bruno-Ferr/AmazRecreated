import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema({
  products: [{
    id: String,
    name: String,
    brand: String,
    price: Number,
    shippingFree: Boolean,
    discount: Number || false,
    amount: Number
  }],
  userAddress: String,
  tax: Number,
  totalPrice: Number,
  date: Date
})

export const Booking = mongoose.model('Booking', BookingSchema)