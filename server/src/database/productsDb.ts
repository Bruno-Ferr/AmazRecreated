import fs from 'fs'
import { Shoe, Book, Earring, Coffee } from './models/products'

export function readDB() {
  const data = fs.readFileSync('./db/products.json', 'utf-8')

  return JSON.parse(data)
}

export function findProductDB(productId: number) {
  const {itemList} = JSON.parse(fs.readFileSync('./db/products.json', 'utf-8'))
  const [product] = itemList.filter((product: any) => product.id === productId)

  return product
}

interface ShoeAttributes {
  color: string, 
  sizes: [{
    size: string, 
    amount: number
  }]
  price: string
}

interface BookAttributes {
  type: string, 
  amount: number,
  price: string
}

interface CoffeeAttributes {
  milk: string, 
  sizes: [{
    size: string, 
    amount: number,
    price: string
  }]
}

interface EarringAttributes {
  color: string, 
  amount: number,
  price: string
}

type ProductProps = {
  name: string
  brand: string
  category: 'shoe' | 'book' | 'earring' | 'coffee'
  description: string
  image: [string]
  attributes: ShoeAttributes | BookAttributes | EarringAttributes | CoffeeAttributes
  reviews: [{
    comment: string
    stars: number
  }]
  shippingFree: boolean
  discount: string | false
}

export async function addProductToDB(product: ProductProps) {
  const list = {
    'shoe': Shoe,
    'book': Book,
    'earring': Earring,
    'coffee': Coffee
  }

  const ProductType = list[product.category]
  
  const data = new ProductType(product)
  data.save();
}