import fs from 'fs'
import { Product } from './models/products'

export function readDB() {
  const data = fs.readFileSync('./db/products.json', 'utf-8')

  return JSON.parse(data)
}

export function findProductDB(productId: number) {
  const {itemList} = JSON.parse(fs.readFileSync('./db/products.json', 'utf-8'))
  const [product] = itemList.filter((product: any) => product.id === productId)

  return product
}

type ProductProps = {
  id: String
  name: String
  brand: String
  price: String
  reviews: [{
    comment: String
    stars: Number
  }]
  image: [String]
  shippingFree: Boolean
  discount: String | false
  amount: Number
}

export async function addProductToDB(product: ProductProps) {
  const data = new Product(product)
  data.save();
}