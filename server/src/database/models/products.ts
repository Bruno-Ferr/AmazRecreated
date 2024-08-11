import mongoose, { Schema } from "mongoose";

const ShoeAttributesSchema = new Schema({
  color: String, 
  sizes: [{
    size: String, 
    amount: Number, 
  }],
  price: String
});

const BookAttributesSchema = new Schema({
  type: String, amount: Number, price: String
});

const CoffeeAttributesSchema = new Schema({
  milk: String, 
  sizes: [{size: String, amount: Number, price: String}],
});

const EarringAttributesSchema = new Schema({
  color: String, 
  amount: Number, 
  price: String
});

// Define the base Product schema
const ProductSchema = new Schema({
  name: String,
  brand: String,
  category: String,
  discount: String,
  description: String,
  image: [String],
  attributes: Schema.Types.Mixed, // Allows flexibility for different attribute schemas
  reviews: [{
    comment: String,
    stars: Number,
  }],
  shippingFree: Boolean,
});


// Define a discriminator for the Product schema to handle different types of attributes
export const Product = mongoose.model('Product', ProductSchema);

// Define specific models for different products with their attributes
export const Shoe = Product.discriminator('Shoe', new Schema({
  attributes: [ShoeAttributesSchema],
}));

export const Book = Product.discriminator('Book', new Schema({
  attributes: [BookAttributesSchema],
}));

export const Earring = Product.discriminator('Earring', new Schema({
  attributes: [EarringAttributesSchema],
}));

export const Coffee = Product.discriminator('Coffee', new Schema({
  attributes: [CoffeeAttributesSchema],
}));